import { env } from "process";
import { SecretsManager } from "aws-sdk";

export function getAWSSecret(
  SecretId: string
): Promise<{ [key: string]: string }> {
  return new Promise((resolve, reject) => {
    new SecretsManager({
      region: env.AWS_REGION,
    }).getSecretValue({ SecretId }, (error, data) => {
      if (error) {
        reject(error);
        return;
      }

      // Retrieve values
      const value = data.SecretString;
      if (value === undefined) {
        reject(new Error("Missing secret value."));
        return;
      }

      const values = JSON.parse(value);
      resolve(values);
    });
  });
}
