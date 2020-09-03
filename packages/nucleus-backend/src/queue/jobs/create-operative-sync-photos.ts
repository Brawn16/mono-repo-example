import { env } from "process";
import { S3, Credentials } from "aws-sdk";
import { OperativeEntity } from "../../shared/entity/operative.entity";
import { UploadEntity } from "../../shared/entity/upload.entity";
import { getMSGraphClient } from "../../shared/ms-graph/client";

export async function createOperativeSyncPhotos(operativeId: string) {
  const api = env.SERVICE_NEW_STARTER_MS_GRAPH_SYNC_FILES_API;
  const newFileApi = `${api}:/children`;

  const accessKey = env.AWS_UPLOAD_ACCESS_KEY;
  const accessSecret = env.AWS_UPLOAD_ACCESS_SECRET;
  const bucket = env.AWS_UPLOAD_BUCKET;
  const endpoint = env.AWS_UPLOAD_ENDPOINT;
  if (
    accessKey === undefined ||
    accessSecret === undefined ||
    bucket === undefined ||
    endpoint === undefined
  ) {
    throw new Error("Upload bucket is not configured.");
  }

  const s3 = new S3({
    credentials: new Credentials({
      accessKeyId: accessKey,
      secretAccessKey: accessSecret,
    }),
    endpoint,
  });

  if (api === undefined) {
    throw new Error("MS Graph file creation is not configured.");
  }

  const operative = await OperativeEntity.findOneOrFail(operativeId, {
    relations: [
      "identifications",
      "photoUpload",
      "identifications.identification",
    ],
  });

  const client = getMSGraphClient();

  const response = await client.api(newFileApi).post({
    name: operative.email,
    folder: {},
    "@microsoft.graph.conflictBehavior": "rename",
  });

  const upload = async (Key: string, name: string) => {
    const stream = await new Promise((resolve, reject) => {
      s3.getObject(
        {
          Bucket: bucket,
          Key,
        },
        (error, { Body }) => {
          if (error) {
            reject(error);
          }
          resolve(Body);
        }
      );
    });

    return client
      .api(
        `groups/a456dd18-d1c9-41a6-8286-9086a270e4dc/drive/items/${response.id}:/${name}:/content`
      )
      .put(stream);
  };

  const selfiePromise =
    operative.photoUpload &&
    upload(operative.photoUpload.id as string, "Selfie.jpg");

  const promises = [selfiePromise];

  let i = 0;

  const operativeIdentifications = operative.identifications || [];
  operativeIdentifications.forEach((operativeIdentification) => {
    if (
      operativeIdentification.uploads === undefined ||
      operativeIdentification.identification === undefined
    ) {
      return;
    }
    const identificationName =
      operativeIdentification.identification.name || "";
    operativeIdentification.uploads.forEach(async (item: string) => {
      const entity = await UploadEntity.findOne(item);
      i += 1;
      const fileExtension = entity && entity.name && entity.name.split(".")[1];

      promises.push(
        upload(
          item,
          `${identificationName.replace("/", " ")} ${i}.${fileExtension}`
        )
      );
    });
  });

  if (operative.qualificationUploadIds) {
    operative.qualificationUploadIds.forEach(
      (qualification: string, index: number) => {
        promises.push(upload(qualification, `Qualification ${index + 1}.jpg`));
      }
    );
  }
  return Promise.all(promises);
}
