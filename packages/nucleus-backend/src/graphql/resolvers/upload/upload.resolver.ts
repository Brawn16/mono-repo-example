import { env } from "process";
import { ForbiddenError } from "apollo-server-core";
import { plainToClass } from "class-transformer";
import { Mutation, Query, Resolver, Arg } from "type-graphql";
import { getS3Client } from "../../../shared/aws/s3";
import { UploadEntity } from "../../../shared/entity/upload.entity";
import { Public } from "../../decorators/public";
import { CreatePresignedUploadUrlDto } from "./create-presigned-upload-url.dto";
import { CreatePresignedUploadDto } from "./create-presigned-upload.dto";
import { CreatePresignedUploadInput } from "./create-presigned-upload.input";

@Resolver()
export class UploadResolver {
  @Mutation(() => CreatePresignedUploadDto)
  @Public()
  public async createPresignedUpload(
    @Arg("data") data: CreatePresignedUploadInput
  ): Promise<CreatePresignedUploadDto> {
    const upload = await plainToClass(UploadEntity, data).save();
    const s3 = getS3Client();

    // Build parameters with conditions to use when uploading.
    // Content length is in bytes, so 100000000 = 100mb.
    const parameters = {
      Bucket: env.AWS_UPLOADS_BUCKET,
      Conditions: [["content-length-range", 100, 100000000]],
      Expires: 60,
      Fields: {
        key: upload.id,
      },
    };

    // Create presigned POST url. Note we are using this method rather
    // than getSignedKey as it supports using content-length-range to
    // set a max upload size.
    return new Promise((resolve, reject) =>
      s3.createPresignedPost(parameters, (error, { fields, url }) => {
        if (error) {
          reject(error);
          return;
        }

        resolve({
          presignedPostJson: JSON.stringify({
            ...fields,
            key: upload.id,
          }),
          presignedPostUrl: url,
          upload,
        });
      })
    );
  }

  @Query(() => CreatePresignedUploadUrlDto)
  @Public()
  public async createPresignedUploadUrl(
    @Arg("id") id: string
  ): Promise<CreatePresignedUploadUrlDto> {
    const upload = await UploadEntity.findOneOrFail(id);
    const { tags = [] } = upload;
    const s3 = getS3Client();

    // If upload does not have a public tag, throw exception. If you
    // need to view non-public files, create your endpoint with
    // specific permissions.
    if (tags.includes("public") === false) {
      throw new ForbiddenError("Upload is not flagged as public.");
    }

    const url = await s3.getSignedUrlPromise("getObject", {
      Bucket: env.AWS_UPLOADS_BUCKET,
      Expires: 60,
      Key: id,
    });

    return { upload, url };
  }
}
