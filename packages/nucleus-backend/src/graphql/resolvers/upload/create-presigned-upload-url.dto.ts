import { Field, ObjectType } from "type-graphql";
import { UploadEntity } from "../../../shared/entity/upload.entity";

@ObjectType()
export class CreatePresignedUploadUrlDto {
  @Field()
  public presignedUrl?: string;

  @Field()
  public upload?: UploadEntity;
}
