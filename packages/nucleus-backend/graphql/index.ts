import { ApolloServer } from "apollo-server-lambda";
import { createConnection } from "typeorm";
import { context } from "./core/context";
import { getSchema } from "./core/schema";

export const connection = createConnection();

export const server = new ApolloServer({
  context,
  schema: getSchema(),
  tracing: true
});

export const run = server.createHandler();
