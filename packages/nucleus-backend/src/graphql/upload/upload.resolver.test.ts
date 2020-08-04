import { S3 } from "aws-sdk";
import { createSandbox } from "sinon";
import { UploadEntity } from "../../shared/entity/upload.entity";
import { stubEntity } from "../../shared/tests/helpers/entity";
import { UploadResolver } from "./upload.resolver";

const { restore, stub } = createSandbox();
afterEach(async () => restore());

it("creates a presigned upload", async () => {
  const upload = new UploadEntity();
  const { save } = stubEntity(stub, UploadEntity, [upload]);
  const fields = { key: "value" };

  stub(S3.prototype, "createPresignedPost").yields(undefined, {
    fields,
    url: "url"
  });

  const result = await new UploadResolver().createPresignedUpload({
    contentType: "contentType",
    name: "name",
    size: 100,
    tags: ["tag"]
  });

  expect(save.called);
  expect(result).toMatchObject({
    presignedPostHeaderJson: JSON.stringify(fields),
    presignedPostUrl: "url",
    upload: {
      contentType: "contentType",
      isUploaded: false,
      name: "name",
      size: 100,
      tags: ["tag"]
    }
  });
});
