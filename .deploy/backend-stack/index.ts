import { Construct, Duration, SecretValue, Stack } from "@aws-cdk/core";
import {
  InstanceClass,
  InstanceSize,
  InstanceType,
  Port,
  SecurityGroup,
  Vpc,
} from "@aws-cdk/aws-ec2";
import { Code, Function, Runtime } from "@aws-cdk/aws-lambda";
import { LambdaRestApi } from "@aws-cdk/aws-apigateway";
import { resolve } from "path";
import {
  DatabaseInstance,
  DatabaseInstanceEngine,
  PostgresEngineVersion,
} from "@aws-cdk/aws-rds";
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
        region: "eu-west-2",
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

    // Create core database
    const coreDatabase = new DatabaseInstance(this, "CoreDatabase", {
      allocatedStorage: 20,
      backupRetention: Duration.days(7),
      databaseName: "nucleus",
      deletionProtection: terminationProtection,
      enablePerformanceInsights: true,
      engine: DatabaseInstanceEngine.postgres({
        version: PostgresEngineVersion.VER_12,
      }),
      instanceIdentifier: `nucleus-backend-core-${sanitizeBranch(
        branch,
        true
      )}`,
      instanceType: InstanceType.of(
        InstanceClass.BURSTABLE3,
        InstanceSize.MICRO
      ),
      masterUserPassword: new SecretValue(
        graphqlLambdaSecret.secretValueFromJson("TYPEORM_PASSWORD")
      ),
      masterUsername: "nucleus",
      monitoringInterval: Duration.minutes(1),
      maxAllocatedStorage: 1000,
      preferredBackupWindow: "02:00-03:00",
      preferredMaintenanceWindow: "Mon:04:00-Mon:05:00",
      securityGroups: [coreDatabaseSecurityGroup],
      vpc,
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
        TYPEORM_HOST: coreDatabase.dbInstanceEndpointAddress,
        TYPEORM_SEED: "true",
      },
      functionName: graphqlLambdaName,
      handler: "dist/graphql/index.graphqlHandler",
      runtime: Runtime.NODEJS_12_X,
      securityGroups: [graphqlSecurityGroup],
      timeout: Duration.seconds(15),
      vpc,
    });

    // Give graphql lambda access to core database
    coreDatabaseSecurityGroup.addIngressRule(
      graphqlSecurityGroup,
      Port.tcp(5432),
      `Core database access for Nucleus backend graphql lambda (${branch})`
    );

    // Give graphql lambda access to graphql lambda secrets
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
  }
}
