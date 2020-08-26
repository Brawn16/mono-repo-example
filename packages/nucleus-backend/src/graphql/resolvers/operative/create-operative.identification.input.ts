import { Field, InputType } from "type-graphql";

@InputType()
export class CreateOperativeIdentificationInput {
  @Field()
  public type?: string;

  @Field(() => [String])
  public uploads?: string[];
}
