import { Field, ObjectType } from "type-graphql";
import { UploadEntity } from "../../../shared/entity/upload.entity";

@ObjectType()
export class CreatePresignedUploadUrlDto {
  @Field()
  public upload?: UploadEntity;

  @Field()
  public url?: string;
}
