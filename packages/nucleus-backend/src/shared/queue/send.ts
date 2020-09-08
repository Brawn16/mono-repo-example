import { env } from "process";
import { SQS } from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

export function sendQueueMessage(
  jobName: string,
  payload: any,
  messageGroupId: string = uuidv4()
) {
  return new Promise((resolve, reject) => {
    const endpoint = env.AWS_QUEUE_ENDPOINT;
    const ssl = env.AWS_QUEUE_SSL;
    const url = env.AWS_QUEUE_URL;

    // Check we have necessary configuration
    if (endpoint === undefined || ssl === undefined || url === undefined) {
      throw new Error("Queue is not configured.");
    }

    // Create client
    const sqs = new SQS({
      endpoint,
      sslEnabled: ssl === "true",
    });

    sqs.sendMessage(
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
