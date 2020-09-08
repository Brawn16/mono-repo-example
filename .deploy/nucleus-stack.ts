import { Construct, Duration, Fn, Stack } from "@aws-cdk/core";
import {
  BastionHostLinux,
  Peer,
  Port,
  SecurityGroup,
  SubnetType,
  Vpc,
} from "@aws-cdk/aws-ec2";
import { Queue, QueueEncryption } from "@aws-cdk/aws-sqs";
import { Code, Function, Runtime } from "@aws-cdk/aws-lambda";
import { LambdaRestApi } from "@aws-cdk/aws-apigateway";
import { resolve } from "path";
import { CfnDBCluster, CfnDBSubnetGroup } from "@aws-cdk/aws-rds";
import { Secret } from "@aws-cdk/aws-secretsmanager";
import { sanitizeBranch } from "./utils";
import {
  CloudFrontWebDistribution,
  OriginAccessIdentity,
} from "@aws-cdk/aws-cloudfront";
import { Bucket, BlockPublicAccess } from "@aws-cdk/aws-s3";
import { BucketDeployment, Source } from "@aws-cdk/aws-s3-deployment";
import { RemovalPolicy } from "@aws-cdk/core";

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
        autoPause: true,
        maxCapacity: 2,
        minCapacity: 2,
        secondsUntilAutoPause: 300,
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
    });

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
      code: Code.fromAsset(resolve(__dirname, "../packages/nucleus-backend"), {
        exclude: [
          "*.*",
          ".*",
          "!dist/**",
          "!node_modules/**",
          "!.env",
          "!jwt.key",
        ],
      }),
      description: `Graphql lambda for Nucleus backend (${branch})`,
      environment: {
        APOLLO_PLAYGROUND_ENDPOINT: "/prod/graphql",
        AWS_QUEUE_ENDPOINT: "",
        AWS_QUEUE_SSL: "true",
        AWS_QUEUE_URL: coreQueue.queueUrl,
        AWS_SECRET: `${namePrefixBackend}-LambdaSecret`,
        TYPEORM_HOST: coreDatabase.attrEndpointAddress,
      },
      functionName: `${namePrefixBackend}-GraphqlLambda`,
      handler: "dist/graphql/index.graphqlHandler",
      runtime: Runtime.NODEJS_12_X,
      securityGroups: [graphqlSecurityGroup],
      timeout: Duration.seconds(15),
      vpc: vpc,
    });

    // Grant graphql lambda access to graphql lambda secret
    if (graphqlLambda.role) {
      lambdaSecret.grantRead(graphqlLambda.role);
    }

    // Grant graphql lambda access to core database
    coreDatabaseSecurityGroup.addIngressRule(
      graphqlSecurityGroup,
      Port.tcp(5432),
      `Core database access for Nucleus backend graphql lambda (${branch})`
    );

    // Grant graphql lamba access to core queue
    coreQueue.grantSendMessages(graphqlLambda);

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

    // Grant manchester office access to core VPC bastion
    coreVpcBastionSecurityGroup.addIngressRule(
      Peer.ipv4("212.36.35.198/32"),
      Port.tcp(22),
      `Manchester office access for Nucleus backend core VPC bastion (${branch})`
    );

    // Create frontend bucket
    const frontendBucket = new Bucket(this, "NucleusFrontendBucket", {
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      bucketName: `${namePrefixFrontend}-Bucket`.toLowerCase(),
      removalPolicy: RemovalPolicy.DESTROY,
    });

    // Create cloudfront OAI
    const cloudFrontOriginAccessIdentity = new OriginAccessIdentity(
      this,
      "NucleusFrontendCloudFrontOriginAccessIdentity",
      {
        comment: `CloudFront origin access identity for Nucleus frontend (${branch})`,
      }
    );

    // Grant cloudfront OAI access to bucket
    frontendBucket.grantRead(cloudFrontOriginAccessIdentity);

    // Create cloudfront web distribution
    const cloudFrontWebDistribution = new CloudFrontWebDistribution(
      this,
      "NucleusFrontendCloudFrontWebDistribution",
      {
        comment: `CloudFront web distribution for Nucleus frontend (${branch})`,
        errorConfigurations: [
          {
            errorCode: 404,
            responseCode: 200,
            responsePagePath: "/index.html",
          },
        ],
        originConfigs: [
          {
            behaviors: [
              {
                isDefaultBehavior: true,
              },
            ],
            s3OriginSource: {
              originAccessIdentity: cloudFrontOriginAccessIdentity,
              s3BucketSource: frontendBucket,
            },
          },
        ],
      }
    );

    // Grant cloudfront web distribution access to graphql lambda
    graphqlLambda.addEnvironment(
      "APOLLO_CORS_ORIGIN",
      `https://${cloudFrontWebDistribution.distributionDomainName}`
    );

    // Create bucket deployment
    new BucketDeployment(this, "NucleusFrontendBucketDeployment", {
      destinationBucket: frontendBucket,
      distribution: cloudFrontWebDistribution,
      sources: [
        Source.asset(resolve(__dirname, "../packages/nucleus-frontend/out")),
      ],
    });
  }
}
