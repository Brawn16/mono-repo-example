import { hash } from "argon2";
import { UserEntity } from "../../entity/user.entity";

export async function getMockUserEntity(): Promise<UserEntity> {
  const user = new UserEntity();

  user.id = "id";
  user.email = "email";
  user.password = await hash("password");
  user.isActive = true;
  user.isVerified = true;

  user.loadCurrentPassword();
  return user;
}
