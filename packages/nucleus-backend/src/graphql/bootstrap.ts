import { resolve as resolvePath } from "path";
import { cwd, env } from "process";
import { SecretsManager } from "aws-sdk";
import { config } from "dotenv";
import { createConnection } from "typeorm";

// Load .env files
const path = resolvePath(cwd(), ".env.local");
config({ path });
config();

function getSecret(SecretId: string): Promise<{ [key: string]: string }> {
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

export async function bootstrap() {
  // Load secrets
  if (env.AWS_SECRET) {
    const secrets = await getSecret(env.AWS_SECRET);
    Object.keys(secrets).forEach((key) => {
      env[key] = secrets[key];
    });
  }

  // Create database connection
  await createConnection();
}
