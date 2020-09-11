import { env } from "process";
import { S3, Credentials } from "aws-sdk";

export function getS3Client() {
  const bucket = env.AWS_UPLOADS_BUCKET;
  let credentials;
  let endpoint;

  if (bucket === undefined) {
    throw new Error("Upload bucket is not configured.");
  }

  // If we are using a local bucket, set endpoint and credentials
  if (bucket.includes("localhost")) {
    endpoint = "http://localhost:4569";
    credentials = new Credentials({
      accessKeyId: "S3RVER",
      secretAccessKey: "S3RVER",
    });
  }

  return new S3({
    credentials,
    endpoint,
  });
}

export function getS3Object(id: string) {
  const bucket = env.AWS_UPLOADS_BUCKET;
  const s3 = getS3Client();

  if (bucket === undefined) {
    throw new Error("Upload bucket is not configured.");
  }

  return new Promise((resolve, reject) => {
    s3.getObject(
      {
        Bucket: bucket,
        Key: id,
      },
      (error, { Body }) => {
        if (error) {
          reject(error);
        }
        resolve(Body);
      }
    );
  });
}
