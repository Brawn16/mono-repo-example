import { Field, ObjectType } from "type-graphql";
import { UploadEntity } from "../../../shared/entity/upload.entity";

@ObjectType()
export class CreatePresignedUploadDto {
  @Field()
  public presignedPostJson?: string;

  @Field()
  public presignedPostUrl?: string;

  @Field()
  public upload?: UploadEntity;
}
