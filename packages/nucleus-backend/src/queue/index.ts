import {
  Callback,
  SQSEvent,
  Context as LambdaContext,
  SQSRecord,
} from "aws-lambda";
import { hasBooted } from "../shared/bootstrap";
import * as jobs from "./jobs";

function processEvent({ body }: SQSRecord): Promise<void> {
  const { jobName, payload } = JSON.parse(body);
  const job = (jobs as any)[jobName];

  // Throw error if job does not exist
  if (job === undefined) {
    throw new Error("Unknown job.");
  }

  return job(payload);
}

export function queueHandler(
  { Records: events }: SQSEvent,
  _context_: LambdaContext,
  callback: Callback<void>
) {
  hasBooted.then(async () => {
    await Promise.all(events.map((event) => processEvent(event)));
    callback();
  });
}
