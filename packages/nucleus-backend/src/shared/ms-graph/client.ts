import { Client } from "@microsoft/microsoft-graph-client";
import { AuthenticationProvider } from "./authentication-provider";

export function getMSGraphClient() {
  return Client.initWithMiddleware({
    authProvider: new AuthenticationProvider(),
  });
}
