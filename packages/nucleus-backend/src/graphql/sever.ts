import { env } from "process";
import { ISettings } from "@apollographql/graphql-playground-html/dist/render-playground-page";
import { ApolloServer, Config } from "apollo-server-lambda";
import { context } from "./core/context";
import { getSchema } from "./core/schema";

const config: Config = {
  context,
  schema: getSchema()
};

// If playground is enabled, update config and enable tracing
if (env.APOLLO_PLAYGROUND_ENABLED === "true") {
  config.tracing = true;
  config.playground = {
    endpoint: env.APOLLO_PLAYGROUND_ENDPOINT,

    // Disable polling by default so we don't flood the
    // console with requests with running locally
    settings: {
      "schema.polling.enable": false
    } as Partial<ISettings>
  };
}

export const server = new ApolloServer(config);
