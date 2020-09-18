import { env } from "process";
import axios from "axios";
import { getS3Object } from "../../shared/aws/s3";
import { OperativeEntity } from "../../shared/entity/operative.entity";
import { UploadEntity } from "../../shared/entity/upload.entity";
import { getMSGraphClient } from "../../shared/ms-graph/client";

function getUploadExtension(upload: UploadEntity) {
  const { name = "" } = upload;
  return name.slice(name.lastIndexOf("."));
}

export async function createOperativeSyncPhotos(operativeId: string) {
  const api = env.SERVICE_NEW_STARTER_MS_GRAPH_SYNC_FILES_API;
  const promises: Array<Promise<void>> = [];
  const newFileApi = `${api}:/children`;
  const client = getMSGraphClient();

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

  // Create folder
  const response = await client.api(newFileApi).post({
    name: operative.email,
    folder: {},
    "@microsoft.graph.conflictBehavior": "rename",
  });

  // Upload file to folder
  const upload = async (id: string, name: string, size: number | 0) => {
    const stream = await getS3Object(id);

    if (size < 4194304) {
      return client
        .api(
          `groups/a456dd18-d1c9-41a6-8286-9086a270e4dc/drive/items/${response.id}:/${name}:/content`
        )
        .put(stream);
    }

    const sessionResponse = await client
      .api(
        `groups/a456dd18-d1c9-41a6-8286-9086a270e4dc/drive/items/${response.id}:/${name}:/createUploadSession`
      )
      .post({ "@microsoft.graph.conflictBehavior": "rename" });

    return axios.put(sessionResponse.uploadUrl, stream, {
      maxBodyLength: 1000000000,
      maxContentLength: 100000000,
      headers: {
        "Content-Length": size,
        "Content-Range": `bytes 0-${size - 1}/${size}`,
        "Content-Type": "application/octet-stream",
      },
    });
  };

  // Upload photo
  const { photoUpload } = operative;
  if (photoUpload) {
    const extension = getUploadExtension(photoUpload);
    promises.push(
      upload(photoUpload.id || "", `Photo${extension}`, photoUpload.size || 0)
    );
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
        return upload(
          id,
          `${idName} ${index + 1}${extension}`,
          uploadEntity.size || 0
        );
      })
    );
  });

  const { qualificationUploadIds } = operative;
  if (qualificationUploadIds) {
    promises.concat(
      qualificationUploadIds.map(async (id: string, index: number) => {
        const uploadEntity = await UploadEntity.findOneOrFail(id);
        const extension = getUploadExtension(uploadEntity);
        return upload(
          id,
          `Qualification ${index + 1}${extension}`,
          uploadEntity.size || 0
        );
      })
    );
  }

  return Promise.all(promises);
}
