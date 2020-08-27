import { env } from "process";
import { IncomingWebhook, IncomingWebhookSendArguments } from "@slack/webhook";

export function callSlackWebhook(
  urlEnvironmentKey: string,
  payload: IncomingWebhookSendArguments
) {
  const url = env[urlEnvironmentKey];
  if (url === undefined) {
    throw new Error("Slack webhook is not configured.");
  }

  return new IncomingWebhook(url).send(payload);
}
