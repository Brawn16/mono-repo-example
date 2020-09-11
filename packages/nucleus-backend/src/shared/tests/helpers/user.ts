import { generateScryptHash } from "../../crypto/scrypt";
import { UserEntity } from "../../entity/user.entity";

export async function getMockUserEntity(): Promise<UserEntity> {
  const { hash, salt } = await generateScryptHash("password");
  const user = new UserEntity();

  user.id = "id";
  user.email = "email";
  user.password = hash;
  user.passwordSalt = salt;
  user.isActive = true;
  user.isVerified = true;

  user.loadCurrentPassword();
  return user;
}
