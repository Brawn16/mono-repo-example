import { resolve } from "path";
import { cwd } from "process";
import { ISettings } from "@apollographql/graphql-playground-html/dist/render-playground-page";
import { ApolloServer } from "apollo-server-lambda";
import { config } from "dotenv";
import { createConnection } from "typeorm";
import { context } from "./core/context";
import { getSchema } from "./core/schema";

// Load environment variables
config({
  path: resolve(cwd(), ".env.local")
});
config();

export const connection = createConnection();

export const server = new ApolloServer({
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

export const graphqlHandler = server.createHandler();
