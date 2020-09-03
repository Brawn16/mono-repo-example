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
  const client = getMSGraphClient();
  const promises = [];
  let idCount = 0;

  if (api === undefined) {
    throw new Error("MS Graph file creation is not configured.");
  }

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

  const operative = await OperativeEntity.findOneOrFail(operativeId, {
    relations: [
      "identifications",
      "photoUpload",
      "identifications.identification",
    ],
  });

  // Create folder
  const response = await client.api(newFileApi).post({
    name: operative.email,
    folder: {},
    "@microsoft.graph.conflictBehavior": "rename",
  });

  // Upload file to folder
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

  // Upload photo
  const { photoUpload } = operative;
  if (photoUpload) {
    const { id = "", name = "" } = photoUpload;
    const extension = name.slice(name.lastIndexOf("."));
    promises.push(upload(id, `Photo${extension}`));
  }

  const operativeIdentifications = operative.identifications || [];
  operativeIdentifications.forEach(({ identification, uploads }) => {
    if (identification === undefined || uploads === undefined) {
      return;
    }

    let { name: idName = "Identification" } = identification;
    idName = idName.replace("/", " ");
    uploads.forEach(async (id: string) => {
      const { name = "" } = await UploadEntity.findOneOrFail(id);
      const extension = name.slice(name.lastIndexOf("."));
      promises.push(upload(id, `${idName} ${(idCount += 1)}${extension}`));
    });
  });

  const { qualificationUploadIds = [] } = operative;
  qualificationUploadIds.forEach((id: string, index: number) => {
    promises.push(upload(id, `Qualification ${index + 1}.jpg`));
  });

  return Promise.all(promises);
}
