import { env } from "process";
import {
  APIGatewayProxyCallback,
  APIGatewayProxyEvent,
  Context as LambdaContext,
} from "aws-lambda";
import { hasBooted } from "../shared/bootstrap";
import { server } from "./server";

const handler = server.createHandler({
  cors: {
    allowedHeaders: ["authorization", "content-type"],
    methods: ["POST"],
    origin: env.APOLLO_CORS_ORIGIN,
  },
});

export function graphqlHandler(
  event: APIGatewayProxyEvent,
  context_: LambdaContext,
  callback: APIGatewayProxyCallback
) {
  hasBooted.then(async () => {
    handler(event, context_, callback);
  });
}
