import { ISettings } from "@apollographql/graphql-playground-html/dist/render-playground-page";
import { ApolloServer } from "apollo-server-lambda";
import {
  APIGatewayProxyCallback,
  APIGatewayProxyEvent,
  Context as LambdaContext
} from "aws-lambda";
import { createConnection } from "typeorm";
import { context } from "./core/context";
import { getSchema } from "./core/schema";

createConnection();

const server = new ApolloServer({
  context,
  schema: getSchema(),
  playground: {
    endpoint: "/dev/graphql",

    // Disable polling by default so we don't flood the
    // console with requests with running locally
    settings: {
      "schema.polling.enable": false
    } as Partial<ISettings>
  },
  tracing: true
});

const handler = server.createHandler();

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
