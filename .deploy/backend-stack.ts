import { Construct, Duration, SecretValue, Stack } from "@aws-cdk/core";
import {
  InstanceClass,
  InstanceSize,
  InstanceType,
  Vpc,
} from "@aws-cdk/aws-ec2";
import { Code, Function, Runtime } from "@aws-cdk/aws-lambda";
import { resolve } from "path";
import { LambdaRestApi } from "@aws-cdk/aws-apigateway";
import { Asset } from "@aws-cdk/aws-s3-assets";
import { DatabaseInstance, DatabaseInstanceEngine } from "@aws-cdk/aws-rds";
import { StringParameter } from "@aws-cdk/aws-ssm";

export class BackendStack extends Stack {
  constructor(scope: Construct) {
    // Build stack props
    super(scope, "nucleus-backend", {
      description: "Stack for Nucleus backend",
      env: {
        account: "303003277076",
        region: "eu-west-2",
      },
      tags: {
        project: "nucleus",
        stack: "nucleus-backend",
      },
      terminationProtection: true,
    });

    // Sync build to S3
    const asset = new Asset(this, "build", {
      path: resolve(
        `${__dirname}/../packages/nucleus-backend/nucleus-backend.zip`
      ),
    });

    // Create VPC
    const vpc = new Vpc(this, "default");

    // Retrieve database password from SSM
    const password = StringParameter.fromSecureStringParameterAttributes(
      this,
      "password",
      {
        parameterName: "nucleus-backend-database-password",
        version: 1,
      }
    );

    // Create database
    const database = new DatabaseInstance(this, "database", {
      allocatedStorage: 20,
      backupRetention: Duration.days(7),
      databaseName: "nucleus",
      enablePerformanceInsights: true,
      engine: DatabaseInstanceEngine.POSTGRES,
      instanceIdentifier: "nucleus-backend",
      instanceType: InstanceType.of(
        InstanceClass.BURSTABLE3,
        InstanceSize.MICRO
      ),
      masterUserPassword: new SecretValue(password.stringValue),
      masterUsername: "nucleus",
      monitoringInterval: Duration.minutes(1),
      maxAllocatedStorage: 1000,
      preferredBackupWindow: "02:00-03:00",
      preferredMaintenanceWindow: "Mon:04:00-Mon:05:00",
      vpc,
    });

    // Create lambda handler
    const handler = new Function(this, "graphql", {
      code: Code.fromBucket(asset.bucket, asset.s3ObjectKey),
      environment: {
        APOLLO_PLAYGROUND_ENDPOINT: "/prod/graphql",

        TYPEORM_HOST: database.dbInstanceEndpointAddress,
        TYPEORM_PASSWORD: "P383nNR98E2s4siTKFe9wpnMAximHAoC",
      },
      handler: "dist/graphql/index.graphqlHandler",
      runtime: Runtime.NODEJS_12_X,
      timeout: Duration.seconds(15),
      vpc,
    });

    // Create API gateway
    new LambdaRestApi(this, "gateway", {
      handler,
    });
  }
}
