import { IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @IsEmail()
  public email?: string;

  @Field({ nullable: true })
  public password?: string;

  @Field({ nullable: true })
  public isActive?: boolean;

  @Field({ nullable: true })
  public isVerified?: boolean;
}
