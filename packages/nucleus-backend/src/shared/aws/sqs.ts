import { env } from "process";
import { SQS } from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

export function getSQSClient() {
  const url = env.AWS_QUEUE_URL;
  let endpoint;

  // Check we have necessary configuration
  if (url === undefined) {
    throw new Error("Queue is not configured.");
  }

  // If we are using a local queue, set endpoint
  if (url.includes("localhost")) {
    endpoint = "http://localhost:9324";
  }

  return new SQS({ endpoint });
}

export function sendSQSMessage(
  jobName: string,
  payload: any,
  messageGroupId: string = uuidv4()
) {
  return new Promise((resolve, reject) => {
    const url = env.AWS_QUEUE_URL;

    // Check we have necessary configuration
    if (url === undefined) {
      throw new Error("Queue is not configured.");
    }

    getSQSClient().sendMessage(
      {
        MessageBody: JSON.stringify({ jobName, payload }),
        MessageGroupId: messageGroupId,
        QueueUrl: url,
      },
      (error, data) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(data);
      }
    );
  });
}
