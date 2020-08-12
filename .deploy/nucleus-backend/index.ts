import { Duration, Fn, Stack } from "@aws-cdk/core";
import {
  BastionHostLinux,
  Peer,
  Port,
  SecurityGroup,
  SubnetType,
  Vpc
} from "@aws-cdk/aws-ec2";
import { Code, Function, Runtime } from "@aws-cdk/aws-lambda";
import { LambdaRestApi, Resource } from "@aws-cdk/aws-apigateway";
import { resolve } from "path";
import { CfnDBCluster, CfnDBSubnetGroup } from "@aws-cdk/aws-rds";
import { Secret } from "@aws-cdk/aws-secretsmanager";
import { sanitizeBranch } from "../utils";

export class NucleusBackend {
  public readonly coreDatabase: CfnDBCluster;
  public readonly coreDatabaseSecurityGroup: SecurityGroup;
  public readonly coreDatabaseSubnetGroup: CfnDBSubnetGroup;
  public readonly coreVpcBastion: BastionHostLinux;
  public readonly coreVpcBastionSecurityGroup: SecurityGroup;
  public readonly graphqlGateway: LambdaRestApi;
  public readonly graphqlGatewayResource: Resource;
  public readonly graphqlLambda: Function;
  public readonly graphqlLambdaSecret: Secret;
  public readonly graphqlSecurityGroup: SecurityGroup;
  public readonly vpc: Vpc;

  constructor(stack: Stack, branch: string, deletionProtection: boolean) {
    const branchPascal = sanitizeBranch(branch);
    const namePrefix = `Nucleus${branchPascal}-NucleusBackend`;
    const graphqlLambdaName = `${namePrefix}-GraphqlLambda`;

    // Create core VPC
    this.vpc = new Vpc(stack, "NucleusBackendCoreVpc");

    // Create graphql lambda secret
    this.graphqlLambdaSecret = new Secret(
      stack,
      "NucleusBackendGraphqlLambdaSecret",
      {
        description: `Secret for Nucleus backend graphql lambda (${branch})`,
        generateSecretString: {
          excludePunctuation: true,
          secretStringTemplate: "{}",
          generateStringKey: "TYPEORM_PASSWORD",
          passwordLength: 30
        },
        secretName: `${graphqlLambdaName}Secret`
      }
    );

    // Create core database security group
    this.coreDatabaseSecurityGroup = new SecurityGroup(
      stack,
      "NucleusBackendCoreDatabaseSecurityGroup",
      {
        description: `Core database security group for Nucleus backend (${branch})`,
        securityGroupName: `${namePrefix}-CoreDatabaseSecurityGroup`,
        vpc: this.vpc
      }
    );

    // Create core database subnet group
    this.coreDatabaseSubnetGroup = new CfnDBSubnetGroup(
      stack,
      "NucleusBackendCoreDatabaseSubnetGroup",
      {
        dbSubnetGroupDescription: `Core database subnet group for Nucleus backend (${branch})`,
        dbSubnetGroupName: `${namePrefix}-CoreDatabaseSubnetGroup`.toLowerCase(),
        subnetIds: this.vpc.privateSubnets.map(sub => sub.subnetId)
      }
    );

    // Create core database
    this.coreDatabase = new CfnDBCluster(stack, "NucleusBackendCoreDatabase", {
      backupRetentionPeriod: 7,
      databaseName: "nucleus",
      dbClusterIdentifier: `${namePrefix}-CoreDatabase`.toLowerCase(),
      dbSubnetGroupName: this.coreDatabaseSubnetGroup.ref,
      deletionProtection,
      engine: "aurora-postgresql",
      engineMode: "serverless",
      engineVersion: "10.7",
      masterUsername: "nucleus",
      masterUserPassword: Fn.join("", [
        "{{resolve:secretsmanager:",
        this.graphqlLambdaSecret.secretArn,
        ":SecretString:TYPEORM_PASSWORD}}"
      ]),
      preferredBackupWindow: "02:00-03:00",
      preferredMaintenanceWindow: "Mon:04:00-Mon:05:00",
      scalingConfiguration: {
        autoPause: true,
        maxCapacity: 2,
        minCapacity: 2,
        secondsUntilAutoPause: 300
      },
      storageEncrypted: true,
      vpcSecurityGroupIds: [this.coreDatabaseSecurityGroup.securityGroupId]
    });

    // Create graphql lambda security group
    this.graphqlSecurityGroup = new SecurityGroup(
      stack,
      "NucleusBackendGraphqlLambdaSecurityGroup",
      {
        description: `Graphql lambda security group for Nucleus backend (${branch})`,
        securityGroupName: `${namePrefix}-GraphqlLambdaSecurityGroup`,
        vpc: this.vpc
      }
    );

    // Create graphql lambda
    this.graphqlLambda = new Function(stack, "NucleusBackendGraphqlLambda", {
      code: Code.fromAsset(
        resolve(__dirname, "../../packages/nucleus-backend"),
        {
          exclude: [
            "*.*",
            ".*",
            "!dist/**",
            "!node_modules/**",
            "!.env",
            "!jwt.key"
          ]
        }
      ),
      description: `Graphql lambda for Nucleus backend (${branch})`,
      environment: {
        APOLLO_PLAYGROUND_ENDPOINT: "/prod/graphql",
        AWS_SECRET: `${graphqlLambdaName}Secret`,
        TYPEORM_HOST: this.coreDatabase.attrEndpointAddress
      },
      functionName: graphqlLambdaName,
      handler: "dist/graphql/index.graphqlHandler",
      runtime: Runtime.NODEJS_12_X,
      securityGroups: [this.graphqlSecurityGroup],
      timeout: Duration.seconds(15),
      vpc: this.vpc
    });

    // Grant graphql lambda access to core database
    this.coreDatabaseSecurityGroup.addIngressRule(
      this.graphqlSecurityGroup,
      Port.tcp(5432),
      `Core database access for Nucleus backend graphql lambda (${branch})`
    );

    // Grant graphql lambda access to graphql lambda secret
    if (this.graphqlLambda.role) {
      this.graphqlLambdaSecret.grantRead(this.graphqlLambda.role);
    }

    // Create graphql gateway
    this.graphqlGateway = new LambdaRestApi(
      stack,
      "NucleusBackendGraphqlGateway",
      {
        description: `Graphql gateway for Nucleus backend (${branch})`,
        handler: this.graphqlLambda,
        minimumCompressionSize: 0,
        proxy: false,
        restApiName: `${namePrefix}-GraphqlGateway`
      }
    );

    // Add graphql routes to graphql gateway
    this.graphqlGatewayResource = this.graphqlGateway.root.addResource(
      "graphql"
    );
    this.graphqlGatewayResource.addMethod("GET");
    this.graphqlGatewayResource.addMethod("POST");

    // Create core VPC bastion security group
    this.coreVpcBastionSecurityGroup = new SecurityGroup(
      stack,
      "NucleusBackendCoreVpcBastionSecurityGroup",
      {
        description: `Core VPC bastion security group for Nucleus backend (${branch})`,
        securityGroupName: `${namePrefix}-CoreVpcBastionSecurityGroup`,
        vpc: this.vpc
      }
    );

    // Create core VPC bastion
    this.coreVpcBastion = new BastionHostLinux(
      stack,
      "NucleusBackendCoreVpcBastion",
      {
        instanceName: `${namePrefix}-CoreVpcBastion`,
        securityGroup: this.coreVpcBastionSecurityGroup,
        subnetSelection: {
          subnetType: SubnetType.PUBLIC
        },
        vpc: this.vpc
      }
    );

    // Grant core VPC bastion access to core database
    this.coreDatabaseSecurityGroup.addIngressRule(
      this.coreVpcBastionSecurityGroup,
      Port.tcp(5432),
      `Core database access for Nucleus backend core VPC bastion (${branch})`
    );

    // Grant manchester office access to core VPC bastion
    this.coreVpcBastionSecurityGroup.addIngressRule(
      Peer.ipv4("212.36.35.198/32"),
      Port.tcp(22),
      `Manchester office access for Nucleus backend core VPC bastion (${branch})`
    );
  }
}
