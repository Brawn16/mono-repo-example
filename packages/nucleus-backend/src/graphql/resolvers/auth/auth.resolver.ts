import { ForbiddenError } from "apollo-server-core";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { verifyScryptHash } from "../../../shared/crypto/scrypt";
import { UserEntity } from "../../../shared/entity/user.entity";
import { createAuthToken } from "../../core/auth";
import { AuthenticatedAppContext } from "../../core/context";
import { Public } from "../../decorators/public";
import { LoginDto } from "./login.dto";

@Resolver()
export class AuthResolver {
  @Query(() => UserEntity)
  public currentUser(@Ctx() { user }: AuthenticatedAppContext): UserEntity {
    return user;
  }

  @Mutation(() => LoginDto)
  @Public()
  public async login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<LoginDto> {
    const user = await UserEntity.findOne({ email });
    if (!user || !user.password || !user.passwordSalt) {
      throw new ForbiddenError("The login details supplied are invalid.");
    }

    const valid = await verifyScryptHash(
      password,
      user.password,
      user.passwordSalt
    );

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
