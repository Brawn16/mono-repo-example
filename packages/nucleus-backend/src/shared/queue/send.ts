import { env } from "process";
import { SQS, Credentials } from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

export function sendQueueMessage(
  jobName: string,
  payload: any,
  messageGroupId: string = uuidv4()
) {
  return new Promise((resolve, reject) => {
    const accessKey = env.AWS_QUEUE_ACCESS_KEY;
    const accessSecret = env.AWS_QUEUE_ACCESS_SECRET;
    const endpoint = env.AWS_QUEUE_ENDPOINT;
    const ssl = env.AWS_QUEUE_SSL;
    const url = env.AWS_QUEUE_URL;

    // Check we have necessary configuration
    if (
      accessKey === undefined ||
      accessSecret === undefined ||
      endpoint === undefined ||
      ssl === undefined ||
      url === undefined
    ) {
      throw new Error("Queue is not configured.");
    }

    // Create client
    const sqs = new SQS({
      credentials: new Credentials({
        accessKeyId: accessKey,
        secretAccessKey: accessSecret,
      }),
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
