import { Field, InputType } from "type-graphql";

@InputType()
export class CreateOperativeIdentificationInput {
  @Field()
  public identification?: string;

  @Field(() => [String])
  public uploads?: string[];
}
