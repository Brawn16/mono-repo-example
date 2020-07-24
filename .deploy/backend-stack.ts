import { Construct, Stack } from "@aws-cdk/core";
import { Code, Function, Runtime } from "@aws-cdk/aws-lambda";
import { resolve } from "path";
import { LambdaRestApi } from "@aws-cdk/aws-apigateway";
import { Asset } from "@aws-cdk/aws-s3-assets";

export class BackendStack extends Stack {
  constructor(scope: Construct) {
    // Build stack props
    super(scope, "nucleus-backend", {
      description: "Stack for Nucleus backend",
      env: {
        account: "303003277076",
        region: "eu-west-2"
      },
      tags: {
        project: "nucleus",
        stack: "nucleus-backend"
      },
      terminationProtection: true
    });

    // Sync build to S3
    const asset = new Asset(this, "nucleus-backend-s3", {
      path: resolve(
        `${__dirname}/../packages/nucleus-backend/nucleus-backend.zip`
      )
    });

    // Create lambda handler
    const handler = new Function(this, "nucleus-backend-lambda", {
      code: Code.fromBucket(asset.bucket, asset.s3ObjectKey),
      handler: "dist/graphql/index.graphqlHandler",
      runtime: Runtime.NODEJS_12_X
    });

    // Create API gateway
    new LambdaRestApi(this, "nucleus-backend-gateway", {
      handler
    });
  }
}
