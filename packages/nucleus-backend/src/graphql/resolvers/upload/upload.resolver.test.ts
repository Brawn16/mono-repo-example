import { env } from "process";
import { S3 } from "aws-sdk";
import { createSandbox } from "sinon";
import { UploadEntity } from "../../../shared/entity/upload.entity";
import { stubEntity } from "../../../shared/tests/helpers/entity";
import { UploadResolver } from "./upload.resolver";

const { restore, stub } = createSandbox();
afterEach(async () => restore());

it("creates a presigned upload", async () => {
  const upload = new UploadEntity();
  upload.id = "id";

  env.AWS_UPLOADS_BUCKET = "";
  env.AWS_UPLOAD_ENDPOINT = "";

  const { save } = stubEntity(stub, UploadEntity, [upload]);
  stub(S3.prototype, "createPresignedPost").yields(undefined, {
    fields: { field: "value" },
    url: "url",
  });

  const result = await new UploadResolver().createPresignedUpload({
    contentType: "contentType",
    name: "name",
    size: 100,
    tags: ["tag"],
  });

  expect(save.called);
  expect(result).toMatchObject({
    presignedPostJson: JSON.stringify({ field: "value" }),
    presignedPostUrl: "url",
    upload: {
      contentType: "contentType",
      name: "name",
      size: 100,
      tags: ["tag"],
    },
  });
});
