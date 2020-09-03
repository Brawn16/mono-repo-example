import { env } from "process";
import { AuthenticationProvider as MicrosoftGraphClientAuthenticatinProvider } from "@microsoft/microsoft-graph-client";
import { post } from "request-promise";

export class AuthenticationProvider
  implements MicrosoftGraphClientAuthenticatinProvider {
  public async getAccessToken(): Promise<string> {
    const {
      SERVICE_MS_GRAPH_CLIENT,
      SERVICE_MS_GRAPH_SECRET,
      SERVICE_MS_GRAPH_TENANT,
    } = env;

    // Check all environment variables are set
    if (
      SERVICE_MS_GRAPH_CLIENT === undefined ||
      SERVICE_MS_GRAPH_SECRET === undefined ||
      SERVICE_MS_GRAPH_TENANT === undefined
    ) {
      throw new Error("MS Graph authentication is not configured.");
    }

    // Attempt to retrieve token
    const response = await post(
      `https://login.microsoftonline.com/${SERVICE_MS_GRAPH_TENANT}/oauth2/v2.0/token`,
      {
        form: {
          grant_type: "client_credentials",
          client_id: SERVICE_MS_GRAPH_CLIENT,
          client_secret: SERVICE_MS_GRAPH_SECRET,
          scope: "https://graph.microsoft.com/.default",
        },
        json: true,
        resolveWithFullResponse: true,
      }
    );

    if (response.statusCode !== 200) {
      throw new Error("Unable to authenticate MS Graph.");
    }

    return response.body.access_token;
  }
}
