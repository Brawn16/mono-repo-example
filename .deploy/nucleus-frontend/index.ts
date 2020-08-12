import { RemovalPolicy } from "@aws-cdk/core";
import { sanitizeBranch } from "../utils";
import {
  CloudFrontWebDistribution,
  OriginAccessIdentity
} from "@aws-cdk/aws-cloudfront";
import { Bucket, BlockPublicAccess } from "@aws-cdk/aws-s3";
import { BucketDeployment, Source } from "@aws-cdk/aws-s3-deployment";
import { resolve } from "path";

export class NucleusFrontend {
  public readonly bucket: Bucket;
  public readonly bucketDeployment: BucketDeployment;
  public readonly cloudFrontOriginAccessIdentity: OriginAccessIdentity;
  public readonly cloudFrontWebDistribution: CloudFrontWebDistribution;

  constructor(stack: any, branch: string, _protection: boolean) {
    const branchPascal = sanitizeBranch(branch);
    const namePrefix = `Nucleus${branchPascal}-NucleusFrontend`;

    // Create bucket
    this.bucket = new Bucket(stack, "NucleusFrontendBucket", {
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      bucketName: `${namePrefix}-Bucket`.toLowerCase(),
      removalPolicy: RemovalPolicy.DESTROY
    });

    // Create cloudfront OAI
    this.cloudFrontOriginAccessIdentity = new OriginAccessIdentity(
      stack,
      "NucleusFrontendCloudFrontOriginAccessIdentity",
      {
        comment: `CloudFront origin access identity for Nucleus frontend (${branch})`
      }
    );

    // Grant cloudfront OAI access to bucket
    this.bucket.grantRead(this.cloudFrontOriginAccessIdentity);

    // Create cloudfront web distribution
    this.cloudFrontWebDistribution = new CloudFrontWebDistribution(
      stack,
      "NucleusFrontendCloudFrontWebDistribution",
      {
        comment: `CloudFront web distribution for Nucleus frontend (${branch})`,
        errorConfigurations: [
          {
            errorCode: 404,
            responseCode: 200,
            responsePagePath: "/index.html"
          }
        ],
        originConfigs: [
          {
            behaviors: [
              {
                isDefaultBehavior: true
              }
            ],
            s3OriginSource: {
              originAccessIdentity: this.cloudFrontOriginAccessIdentity,
              s3BucketSource: this.bucket
            }
          }
        ]
      }
    );

    // Create bucket deployment
    this.bucketDeployment = new BucketDeployment(
      stack,
      "NucleusFrontendBucketDeployment",
      {
        destinationBucket: this.bucket,
        distribution: this.cloudFrontWebDistribution,
        sources: [
          Source.asset(
            resolve(__dirname, "../../packages/nucleus-frontend/out")
          )
        ]
      }
    );
  }
}
