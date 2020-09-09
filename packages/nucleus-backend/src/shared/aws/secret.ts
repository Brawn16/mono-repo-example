import { SecretsManager } from "aws-sdk";

export function getSecretClient() {
  return new SecretsManager();
}

export function getSecret(
  SecretId: string
): Promise<{ [key: string]: string }> {
  return new Promise((resolve, reject) => {
    getSecretClient().getSecretValue({ SecretId }, (error, data) => {
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
