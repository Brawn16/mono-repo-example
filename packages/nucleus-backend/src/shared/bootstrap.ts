import "source-map-support/register";

import { resolve as resolvePath } from "path";
import { env } from "process";
import { config } from "dotenv";
import { getSecret } from "./aws/secret";
import { createConnection } from "./database/connection";

// Load .env files
const path = resolvePath(__dirname, "../../.env.local");
config({ path });
config();

async function bootstrap() {
  // Load secret
  if (env.AWS_SECRET) {
    const secrets = await getSecret(env.AWS_SECRET);
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
