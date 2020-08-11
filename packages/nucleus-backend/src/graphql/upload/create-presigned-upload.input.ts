import { Field, InputType } from "type-graphql";

@InputType()
export class CreatePresignedUploadInput {
  @Field()
  public name?: string;

  @Field()
  public contentType?: string;

  @Field()
  public size?: number;

  @Field(() => [String])
  public tags?: string[];
}
