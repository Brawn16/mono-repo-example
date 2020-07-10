import { Field, ObjectType } from "type-graphql";
import { UserEntity } from "../../shared/entity/user.entity";

@ObjectType()
export class LoginDto {
  @Field()
  public token?: string;

  @Field()
  public user?: UserEntity;
}
