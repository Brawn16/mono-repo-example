import { ForbiddenError } from "apollo-server-core";
import { verify } from "argon2";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { UserEntity } from "../../shared/entity/user.entity";
import { createAuthToken } from "../core/auth";
import { AuthenticatedAppContext } from "../core/context";
import { LoginDto } from "./login.dto";

@Resolver()
export class AuthResolver {
  @Authorized()
  @Query(() => UserEntity)
  public currentUser(@Ctx() { user }: AuthenticatedAppContext): UserEntity {
    return user;
  }

  @Mutation(() => LoginDto)
  public async login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<LoginDto> {
    const user = await UserEntity.findOne({ email });
    if (!user || !user.password) {
      throw new ForbiddenError("The login details supplied are invalid.");
    }

    const valid = await verify(user.password, password);
    if (!valid) {
      throw new ForbiddenError("The login details supplied are invalid.");
    }

    if (!user.isActive) {
      throw new ForbiddenError(
        "This user is disabled, please contact for support for assistance."
      );
    }

    if (!user.isVerified) {
      throw new ForbiddenError("Please verify your email to use this login.");
    }

    const response = new LoginDto();
    response.token = createAuthToken(user);
    response.user = user;

    return response;
  }
}
