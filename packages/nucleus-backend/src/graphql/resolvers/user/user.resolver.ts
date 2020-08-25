import { plainToClass, plainToClassFromExist } from "class-transformer";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { UserEntity } from "../../../shared/entity/user.entity";
import { CreateUserInput } from "./create-user.input";
import { UpdateUserInput } from "./update-user.input";

@Resolver()
export class UserResolver {
  @Mutation(() => UserEntity)
  public createUser(@Arg("data") data: CreateUserInput): Promise<UserEntity> {
    return plainToClass(UserEntity, data).save();
  }

  @Mutation(() => Boolean)
  public async deleteUser(@Arg("id") id: string): Promise<boolean> {
    await UserEntity.delete(id);
    return true;
  }

  @Mutation(() => UserEntity)
  public async updateUser(
    @Arg("id") id: string,
    @Arg("data") data: UpdateUserInput
  ): Promise<UserEntity> {
    const user = await this.user(id);
    return plainToClassFromExist(user, data).save();
  }

  @Query(() => UserEntity)
  public user(@Arg("id") id: string): Promise<UserEntity> {
    return UserEntity.findOneOrFail(id);
  }

  @Query(() => [UserEntity])
  public users(): Promise<UserEntity[]> {
    return UserEntity.find();
  }
}
