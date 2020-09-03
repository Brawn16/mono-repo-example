import { resolve as resolvePath } from "path";
import { env } from "process";
import { SecretsManager } from "aws-sdk";
import { config } from "dotenv";
import { createConnection } from "typeorm";

// Load .env files
const path = resolvePath(__dirname, "../../.env.local");
config({ path });
config();

function getAWSSecret(SecretId: string): Promise<{ [key: string]: string }> {
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

async function bootstrap() {
  // Load secret
  if (env.AWS_SECRET) {
    const secrets = await getAWSSecret(env.AWS_SECRET);
    Object.keys(secrets).forEach((key) => {
      env[key] = secrets[key];
    });
  }

  // Create database connection and run migrations
  const connection = await createConnection();
  await connection.runMigrations({
    transaction: "each",
  });
}

export const hasBooted = bootstrap();
