import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class CreatePresignedUploadUrlDto {
  @Field()
  public presignedUrl?: string;
}
