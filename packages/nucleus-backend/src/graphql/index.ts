import { resolve } from "path";
import { env, cwd } from "process";
import {
  APIGatewayProxyCallback,
  APIGatewayProxyEvent,
  Context as LambdaContext
} from "aws-lambda";
import { config } from "dotenv";
import { createConnection } from "typeorm";
import { server } from "./server";

// Load environment variables
config({
  path: resolve(cwd(), ".env.local")
});
config();

const connection = createConnection();

const handler = server.createHandler({
  cors: {
    allowedHeaders: ["authorization", "content-type"],
    methods: ["POST"],
    origin: env.APOLLO_CORS_ORIGIN
  }
});

async function executeHandler(
  event: APIGatewayProxyEvent,
  context_: LambdaContext,
  callback: APIGatewayProxyCallback
) {
  await connection;
  handler(event, context_, callback);
}

export function graphqlHandler(
  event: APIGatewayProxyEvent,
  context_: LambdaContext,
  callback: APIGatewayProxyCallback
) {
  executeHandler(event, context_, callback);
}
