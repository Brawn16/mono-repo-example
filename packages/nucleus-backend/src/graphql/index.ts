import { env } from "process";
import {
  APIGatewayProxyCallback,
  APIGatewayProxyEvent,
  Context as LambdaContext
} from "aws-lambda";
import { bootstrap } from "./bootstrap";
import { server } from "./server";

const bootstrapped = bootstrap();
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
  await bootstrapped;
  handler(event, context_, callback);
}

export function graphqlHandler(
  event: APIGatewayProxyEvent,
  context_: LambdaContext,
  callback: APIGatewayProxyCallback
) {
  executeHandler(event, context_, callback);
}
