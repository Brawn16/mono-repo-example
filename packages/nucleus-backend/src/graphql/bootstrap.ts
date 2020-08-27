import { resolve as resolvePath } from "path";
import { env } from "process";
import { config } from "dotenv";
import { createConnection } from "typeorm";
import { getAWSSecret } from "../shared/aws/secrets";

// Load .env files
const path = resolvePath(__dirname, "../../.env.local");
config({ path });
config();

export async function bootstrap() {
  // Load secret
  if (env.AWS_SECRET) {
    const secrets = await getAWSSecret(env.AWS_SECRET);
    Object.keys(secrets).forEach(key => {
      env[key] = secrets[key];
    });
  }

  // Create database connection and run migrations
  const connection = await createConnection();
  await connection.runMigrations({
    transaction: "each",
  });
}
