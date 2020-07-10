import { IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  public email?: string;

  @Field()
  public password?: string;

  @Field()
  public isActive?: boolean;

  @Field()
  public isVerified?: boolean;
}
