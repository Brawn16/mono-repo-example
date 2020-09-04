import { env } from "process";
import { S3, Credentials } from "aws-sdk";
import { OperativeEntity } from "../../shared/entity/operative.entity";
import { UploadEntity } from "../../shared/entity/upload.entity";
import { getMSGraphClient } from "../../shared/ms-graph/client";

function getUploadExtension(upload: UploadEntity) {
  const { name = "" } = upload;
  return name.slice(name.lastIndexOf("."));
}

export async function createOperativeSyncPhotos(operativeId: string) {
  const api = env.SERVICE_NEW_STARTER_MS_GRAPH_SYNC_FILES_API;
  const accessKey = env.AWS_UPLOAD_ACCESS_KEY;
  const accessSecret = env.AWS_UPLOAD_ACCESS_SECRET;
  const bucket = env.AWS_UPLOAD_BUCKET;
  const endpoint = env.AWS_UPLOAD_ENDPOINT;
  const promises: Array<Promise<void>> = [];
  const newFileApi = `${api}:/children`;
  const client = getMSGraphClient();

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
    const extension = getUploadExtension(photoUpload);
    promises.push(upload(photoUpload.id || "", `Photo${extension}`));
  }

  const operativeIdentifications = operative.identifications || [];
  operativeIdentifications.forEach(({ identification, uploads }) => {
    if (identification === undefined || uploads === undefined) {
      return;
    }

    let { name: idName = "Identification" } = identification;
    idName = idName.replace("/", " ");

    promises.concat(
      uploads.map(async (id: string, index: number) => {
        const uploadEntity = await UploadEntity.findOneOrFail(id);
        const extension = getUploadExtension(uploadEntity);
        return upload(id, `${idName} ${index + 1}${extension}`);
      })
    );
  });

  const { qualificationUploadIds = [] } = operative;
  promises.concat(
    qualificationUploadIds.map(async (id: string, index: number) => {
      const uploadEntity = await UploadEntity.findOneOrFail(id);
      const extension = getUploadExtension(uploadEntity);
      return upload(id, `Qualification ${index + 1}${extension}`);
    })
  );

  return Promise.all(promises);
}
