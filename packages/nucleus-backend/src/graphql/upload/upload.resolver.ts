import { env } from "process";
import { S3 } from "aws-sdk";
import { plainToClass } from "class-transformer";
import { Mutation, Resolver, Arg } from "type-graphql";
import { UploadEntity } from "../../shared/entity/upload.entity";
import { CreatePresignedUploadDto } from "./create-presigned-upload.dto";
import { CreatePresignedUploadInput } from "./create-presigned-upload.input";

@Resolver()
export class UploadResolver {
  @Mutation(() => CreatePresignedUploadDto)
  public async createPresignedUpload(
    @Arg("data") data: CreatePresignedUploadInput
  ): Promise<CreatePresignedUploadDto> {
    // Create upload record
    const upload = await plainToClass(UploadEntity, {
      ...data,
      isUploaded: false
    }).save();

    const s3 = new S3({
      accessKeyId: env.AWS_UPLOAD_ACCESS_KEY,
      endpoint: env.AWS_UPLOAD_ENDPOINT,
      secretAccessKey: env.AWS_UPLOAD_ACCESS_SECRET
    });

    // Build parameters with conditions to use when uploading.
    // Content length is in bytes, so 100000000 = 100mb.
    const parameters = {
      Bucket: env.AWS_UPLOAD_BUCKET,
      Conditions: [
        { bucket: env.AWS_UPLOAD_BUCKET },
        ["content-length-range", 100, 100000000],
        { "content-type": data.contentType },
        { key: upload.id }
      ],
      Expires: 60
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
            key: upload.id
          }),
          presignedPostUrl: url,
          upload
        });
      })
    );
  }
}
