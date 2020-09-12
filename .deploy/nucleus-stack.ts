import { Construct, Duration, Fn, Stack } from "@aws-cdk/core";
import {
  BastionHostLinux,
  Port,
  SecurityGroup,
  SubnetType,
  Vpc,
} from "@aws-cdk/aws-ec2";
import { Queue, QueueEncryption } from "@aws-cdk/aws-sqs";
import {
  Code,
  Function,
  Runtime,
  Tracing,
  Alias,
  Version,
} from "@aws-cdk/aws-lambda";
import { SqsEventSource } from "@aws-cdk/aws-lambda-event-sources";
import { LambdaRestApi } from "@aws-cdk/aws-apigateway";
import { resolve } from "path";
import { CfnDBCluster, CfnDBSubnetGroup } from "@aws-cdk/aws-rds";
import { Secret } from "@aws-cdk/aws-secretsmanager";
import { sanitizeBranch } from "./utils";
import {
  CloudFrontWebDistribution,
  OriginProtocolPolicy,
} from "@aws-cdk/aws-cloudfront";
import { Bucket, BlockPublicAccess, HttpMethods } from "@aws-cdk/aws-s3";
import { BucketDeployment, Source } from "@aws-cdk/aws-s3-deployment";
import { RemovalPolicy } from "@aws-cdk/core";
import { v4 as uuidv4 } from "uuid";

export class NucleusStack extends Stack {
  constructor(
    scope: Construct,
    branch: string,
    terminationProtection: boolean
  ) {
    const branchPascal = sanitizeBranch(branch);
    const namePrefixBackend = `Nucleus${branchPascal}-NucleusBackend`;
    const namePrefixFrontend = `Nucleus${branchPascal}-NucleusFrontend`;

    // Create stack
    super(scope, `Nucleus${branchPascal}`, {
      description: `Stack for Nucleus (${branch})`,
      env: {
        account: "303003277076",
        region: "eu-west-1",
      },
      tags: {
        branch,
        project: "nucleus",
      },
      terminationProtection,
    });

    // Create app bucket
    const appBucket = new Bucket(this, "NucleusFrontendAppBucket", {
      bucketName: `${namePrefixFrontend}-AppBucket`.toLowerCase(),
      publicReadAccess: true,
      removalPolicy: RemovalPolicy.DESTROY,
      websiteErrorDocument: "404/index.html",
      websiteIndexDocument: "index.html",
    });

    // Create cloudfront web distribution
    const cloudFrontWebDistribution = new CloudFrontWebDistribution(
      this,
      "NucleusFrontendCloudFrontWebDistribution",
      {
        comment: `CloudFront web distribution for Nucleus frontend (${branch})`,
        originConfigs: [
          {
            behaviors: [
              {
                isDefaultBehavior: true,
              },
            ],
            customOriginSource: {
              domainName: appBucket.bucketWebsiteDomainName,
              originProtocolPolicy: OriginProtocolPolicy.HTTP_ONLY,
            },
          },
        ],
      }
    );

    // Create bucket deployment
    new BucketDeployment(this, "NucleusFrontendBucketDeployment", {
      destinationBucket: appBucket,
      distribution: cloudFrontWebDistribution,
      sources: [
        Source.asset(resolve(__dirname, "../packages/nucleus-frontend/out")),
      ],
    });

    // Create core VPC
    const vpc = new Vpc(this, "NucleusBackendCoreVpc", {
      natGateways: 1,
    });

    // Create lambda secret
    const lambdaSecret = new Secret(this, "NucleusBackendLambdaSecret", {
      description: `Secret for Nucleus backend lambda (${branch})`,
      generateSecretString: {
        excludePunctuation: true,
        secretStringTemplate: "{}",
        generateStringKey: "TYPEORM_PASSWORD",
        passwordLength: 30,
      },
      secretName: `${namePrefixBackend}-LambdaSecret`,
    });

    // Create core database security group
    const coreDatabaseSecurityGroup = new SecurityGroup(
      this,
      "NucleusBackendCoreDatabaseSecurityGroup",
      {
        description: `Core database security group for Nucleus backend (${branch})`,
        securityGroupName: `${namePrefixBackend}-CoreDatabaseSecurityGroup`,
        vpc: vpc,
      }
    );

    // Create core database subnet group
    const coreDatabaseSubnetGroup = new CfnDBSubnetGroup(
      this,
      "NucleusBackendCoreDatabaseSubnetGroup",
      {
        dbSubnetGroupDescription: `Core database subnet group for Nucleus backend (${branch})`,
        dbSubnetGroupName: `${namePrefixBackend}-CoreDatabaseSubnetGroup`.toLowerCase(),
        subnetIds: vpc.privateSubnets.map((sub) => sub.subnetId),
      }
    );

    // Create core database
    const coreDatabase = new CfnDBCluster(this, "NucleusBackendCoreDatabase", {
      backupRetentionPeriod: 7,
      databaseName: "nucleus",
      dbClusterIdentifier: `${namePrefixBackend}-CoreDatabase`.toLowerCase(),
      dbSubnetGroupName: coreDatabaseSubnetGroup.ref,
      deletionProtection: terminationProtection,
      engine: "aurora-postgresql",
      engineMode: "serverless",
      engineVersion: "10.7",
      masterUsername: "nucleus",
      masterUserPassword: Fn.join("", [
        "{{resolve:secretsmanager:",
        lambdaSecret.secretArn,
        ":SecretString:TYPEORM_PASSWORD}}",
      ]),
      scalingConfiguration: {
        autoPause: false,
        maxCapacity: 16,
        minCapacity: 2,
      },
      storageEncrypted: true,
      vpcSecurityGroupIds: [coreDatabaseSecurityGroup.securityGroupId],
    });

    // Create core queue
    const coreQueue = new Queue(this, "NucleusBackendCoreQueue", {
      contentBasedDeduplication: true,
      encryption: QueueEncryption.KMS_MANAGED,
      fifo: true,
      queueName: `${namePrefixBackend}-CoreQueue.fifo`,
      retentionPeriod: Duration.days(14),
      visibilityTimeout: Duration.seconds(120),
    });

    // Create uploads bucket
    const uploadsBucket = new Bucket(this, "NucleusBackendUploads", {
      bucketName: `${namePrefixBackend}-UploadsBucket`.toLowerCase(),
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      cors: [
        {
          allowedMethods: [HttpMethods.POST],
          allowedOrigins: [
            `https://${cloudFrontWebDistribution.distributionDomainName}`,
          ],
        },
      ],
      removalPolicy: RemovalPolicy.DESTROY,
    });

    // Create base lambda props
    const baseLambdaProps = {
      environment: {
        AWS_QUEUE_URL: coreQueue.queueUrl,
        AWS_UPLOADS_BUCKET: uploadsBucket.bucketName,
        AWS_SECRET: `${namePrefixBackend}-LambdaSecret`,
        TYPEORM_HOST: coreDatabase.attrEndpointAddress,
      },
      runtime: Runtime.NODEJS_12_X,
      tracing: Tracing.ACTIVE,
      vpc: vpc,
    };

    // Create graphql lambda security group
    const graphqlSecurityGroup = new SecurityGroup(
      this,
      "NucleusBackendGraphqlLambdaSecurityGroup",
      {
        description: `Graphql lambda security group for Nucleus backend (${branch})`,
        securityGroupName: `${namePrefixBackend}-GraphqlLambdaSecurityGroup`,
        vpc: vpc,
      }
    );

    // Create graphql lambda
    const graphqlLambda = new Function(this, "NucleusBackendGraphqlLambda", {
      ...baseLambdaProps,
      code: Code.fromAsset(resolve(__dirname, "../packages/nucleus-backend"), {
        exclude: [
          "*.*",
          ".*",
          "!dist/graphql/**",
          "!dist/shared/**",
          "!node_modules/**",
          "!.env",
          "!jwt.key",
        ],
      }),
      description: `Graphql lambda for Nucleus backend (${branch})`,
      environment: {
        ...baseLambdaProps.environment,
        APOLLO_CORS_ORIGIN: `https://${cloudFrontWebDistribution.distributionDomainName}`,
        APOLLO_PLAYGROUND_ENDPOINT: "/prod/graphql",
      },
      functionName: `${namePrefixBackend}-GraphqlLambda`,
      handler: "dist/graphql/index.graphqlHandler",
      memorySize: 256,
      securityGroups: [graphqlSecurityGroup],
      timeout: Duration.seconds(25),
    });

    // Create graphql lambda version
    const graphqlLambdaVersion = new Version(
      this,
      "NucleusBackendGraphqlLambdaVersion",
      {
        description: `Graphql lambda version for Nucleus backend (${branch})`,
        lambda: graphqlLambda,
      }
    );

    // Create graphql lambda alias
    const graphqlLambdaAlias = new Alias(
      this,
      "NucleusBackendGraphqlLambdaAlias",
      {
        aliasName: uuidv4(),
        description: `Graphql lambda alias for Nucleus backend (${branch})`,
        provisionedConcurrentExecutions: 16,
        version: graphqlLambdaVersion,
      }
    );

    // Configure graphql lambda alias autoscaling
    graphqlLambdaAlias
      .addAutoScaling({
        maxCapacity: 128,
        minCapacity: 16,
      })
      .scaleOnUtilization({
        utilizationTarget: 0.5,
      });

    // Create graphql gateway
    const graphqlGateway = new LambdaRestApi(
      this,
      "NucleusBackendGraphqlGateway",
      {
        description: `Graphql gateway for Nucleus backend (${branch})`,
        handler: graphqlLambda,
        minimumCompressionSize: 0,
        proxy: false,
        restApiName: `${namePrefixBackend}-GraphqlGateway`,
      }
    );

    // Add graphql routes to graphql gateway
    const graphqlGatewayResource = graphqlGateway.root.addResource("graphql");
    graphqlGatewayResource.addMethod("GET");
    graphqlGatewayResource.addMethod("OPTIONS");
    graphqlGatewayResource.addMethod("POST");

    // Create queue lambda security group
    const queueSecurityGroup = new SecurityGroup(
      this,
      "NucleusBackendQueueLambdaSecurityGroup",
      {
        description: `Queue lambda security group for Nucleus backend (${branch})`,
        securityGroupName: `${namePrefixBackend}-QueueLambdaSecurityGroup`,
        vpc: vpc,
      }
    );

    // Create queue lambda
    const queueLambda = new Function(this, "NucleusBackendQueueLambda", {
      ...baseLambdaProps,
      code: Code.fromAsset(resolve(__dirname, "../packages/nucleus-backend"), {
        exclude: [
          "*.*",
          ".*",
          "!dist/queue/**",
          "!dist/shared/**",
          "!node_modules/**",
          "!.env",
          "!jwt.key",
        ],
      }),
      description: `Queue lambda for Nucleus backend (${branch})`,
      events: [new SqsEventSource(coreQueue)],
      functionName: `${namePrefixBackend}-QueueLambda`,
      handler: "dist/queue/index.queueHandler",
      securityGroups: [queueSecurityGroup],
      timeout: Duration.seconds(115),
    });

    // Grant lambdas access to lambda secret
    lambdaSecret.grantRead(graphqlLambda);
    lambdaSecret.grantRead(queueLambda);

    // Grant lambdas access to core database
    coreDatabaseSecurityGroup.addIngressRule(
      graphqlSecurityGroup,
      Port.tcp(5432),
      `Core database access for Nucleus backend graphql lambda (${branch})`
    );
    coreDatabaseSecurityGroup.addIngressRule(
      queueSecurityGroup,
      Port.tcp(5432),
      `Core database access for Nucleus backend queue lambda (${branch})`
    );

    // Grant lambdas access to core queue
    coreQueue.grantSendMessages(graphqlLambda);
    coreQueue.grantSendMessages(queueLambda);

    // Grant lambdas access to uploads bucket
    uploadsBucket.grantReadWrite(graphqlLambda);
    uploadsBucket.grantReadWrite(queueLambda);

    // Create core VPC bastion security group
    const coreVpcBastionSecurityGroup = new SecurityGroup(
      this,
      "NucleusBackendCoreVpcBastionSecurityGroup",
      {
        description: `Core VPC bastion security group for Nucleus backend (${branch})`,
        securityGroupName: `${namePrefixBackend}-CoreVpcBastionSecurityGroup`,
        vpc: vpc,
      }
    );

    // Create core VPC bastion
    new BastionHostLinux(this, "NucleusBackendCoreVpcBastion", {
      instanceName: `${namePrefixBackend}-CoreVpcBastion`,
      securityGroup: coreVpcBastionSecurityGroup,
      subnetSelection: {
        subnetType: SubnetType.PUBLIC,
      },
      vpc: vpc,
    });

    // Grant core VPC bastion access to core database
    coreDatabaseSecurityGroup.addIngressRule(
      coreVpcBastionSecurityGroup,
      Port.tcp(5432),
      `Core database access for Nucleus backend core VPC bastion (${branch})`
    );
  }
}
