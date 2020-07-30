import { Construct, Duration, Fn, Stack } from "@aws-cdk/core";
import {
  BastionHostLinux,
  Peer,
  Port,
  SecurityGroup,
  SubnetType,
  Vpc,
} from "@aws-cdk/aws-ec2";
import { Code, Function, Runtime } from "@aws-cdk/aws-lambda";
import { LambdaRestApi } from "@aws-cdk/aws-apigateway";
import { resolve } from "path";
import { CfnDBCluster, CfnDBSubnetGroup } from "@aws-cdk/aws-rds";
import { Secret } from "@aws-cdk/aws-secretsmanager";
import { sanitizeBranch } from "../utils";

export class BackendStack extends Stack {
  constructor(scope: Construct, branch: string, terminationProtection = false) {
    const branchPascal = sanitizeBranch(branch);
    const stackName = `NucleusBackend${branchPascal}`;

    // Build stack props
    super(scope, stackName, {
      description: `Stack for Nucleus backend (${branch})`,
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
    const vpc = new Vpc(this, "CoreVpc");

    // Create graphql lambda secret
    const graphqlLambdaName = `${stackName}-GraphqlLambda`;
    const graphqlLambdaSecret = new Secret(this, "GraphqlLambdaSecret", {
      description: `Secret for Nucleus backend graphql lambda (${branch})`,
      generateSecretString: {
        excludePunctuation: true,
        secretStringTemplate: "{}",
        generateStringKey: "TYPEORM_PASSWORD",
        passwordLength: 30,
      },
      secretName: `${graphqlLambdaName}Secret`,
    });

    // Create core database security group
    const coreDatabaseSecurityGroup = new SecurityGroup(
      this,
      "CoreDatabaseSecurityGroup",
      {
        description: `Core database security group for Nucleus backend (${branch})`,
        securityGroupName: `${stackName}-CoreDatabaseSecurityGroup`,
        vpc,
      }
    );

    // Create core database subnet group
    const coreDatabaseSubnetGroup = new CfnDBSubnetGroup(
      this,
      "CoreDatabaseSubnetGroup",
      {
        dbSubnetGroupDescription: `Core database subnet group for Nucleus backend (${branch})`,
        dbSubnetGroupName: `${stackName}-CoreDatabaseSubnetGroup`.toLowerCase(),
        subnetIds: vpc.privateSubnets.map((sub) => sub.subnetId),
      }
    );

    // Create core database
    const coreDatabase = new CfnDBCluster(this, "CoreDatabase", {
      backupRetentionPeriod: 7,
      databaseName: "nucleus",
      dbClusterIdentifier: `${stackName}-CoreDatabase`.toLowerCase(),
      dbSubnetGroupName: coreDatabaseSubnetGroup.ref,
      deletionProtection: terminationProtection,
      engine: "aurora-postgresql",
      engineMode: "serverless",
      engineVersion: "10.7",
      masterUsername: "nucleus",
      masterUserPassword: Fn.join("", [
        "{{resolve:secretsmanager:",
        graphqlLambdaSecret.secretArn,
        ":SecretString:TYPEORM_PASSWORD}}",
      ]),
      preferredBackupWindow: "02:00-03:00",
      preferredMaintenanceWindow: "Mon:04:00-Mon:05:00",
      scalingConfiguration: {
        autoPause: true,
        maxCapacity: 2,
        minCapacity: 2,
        secondsUntilAutoPause: 300,
      },
      storageEncrypted: true,
      vpcSecurityGroupIds: [coreDatabaseSecurityGroup.securityGroupId],
    });

    // Create graphql lambda security group
    const graphqlSecurityGroup = new SecurityGroup(
      this,
      "GraphqlLambdaSecurityGroup",
      {
        description: `Graphql lambda security group for Nucleus backend (${branch})`,
        securityGroupName: `${stackName}-GraphqlLambdaSecurityGroup`,
        vpc,
      }
    );

    // Create graphql lambda
    const graphqlLambda = new Function(this, "GraphqlLambda", {
      code: Code.fromAsset(
        resolve(__dirname, "../../packages/nucleus-backend/code.zip")
      ),
      description: `Graphql lambda for Nucleus backend (${branch})`,
      environment: {
        APOLLO_PLAYGROUND_ENDPOINT: "/prod/graphql",
        AWS_SECRET: `${graphqlLambdaName}Secret`,
        TYPEORM_HOST: coreDatabase.attrEndpointAddress,
      },
      functionName: graphqlLambdaName,
      handler: "dist/graphql/index.graphqlHandler",
      runtime: Runtime.NODEJS_12_X,
      securityGroups: [graphqlSecurityGroup],
      timeout: Duration.seconds(15),
      vpc,
    });

    // Grant graphql lambda access to core database
    coreDatabaseSecurityGroup.addIngressRule(
      graphqlSecurityGroup,
      Port.tcp(5432),
      `Core database access for Nucleus backend graphql lambda (${branch})`
    );

    // Grant graphql lambda access to graphql lambda secrets
    if (graphqlLambda.role) {
      graphqlLambdaSecret.grantRead(graphqlLambda.role);
    }

    // Create graphql gateway
    const graphqlGateway = new LambdaRestApi(this, "GraphqlGateway", {
      description: `Graphql gateway for Nucleus backend (${branch})`,
      handler: graphqlLambda,
      minimumCompressionSize: 0,
      proxy: false,
      restApiName: `${stackName}-GraphqlGateway`,
    });

    // Add graphql routes to graphql gateway
    const graphqlGatewayResource = graphqlGateway.root.addResource("graphql");
    graphqlGatewayResource.addMethod("GET");
    graphqlGatewayResource.addMethod("POST");

    // Create core VPC bastion security group
    const coreVpcBastionSecurityGroup = new SecurityGroup(
      this,
      "CoreVpcBastionSecurityGroup",
      {
        description: `Core VPC bastion security group for Nucleus backend (${branch})`,
        securityGroupName: `${stackName}-CoreVpcBastionSecurityGroup`,
        vpc,
      }
    );

    // Create core VPC bastion
    new BastionHostLinux(this, "CoreVpcBastion", {
      instanceName: `${stackName}-CoreVpcBastion`,
      securityGroup: coreVpcBastionSecurityGroup,
      subnetSelection: {
        subnetType: SubnetType.PUBLIC,
      },
      vpc,
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
  }
}
