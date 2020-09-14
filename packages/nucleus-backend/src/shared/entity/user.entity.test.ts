import { verifyScryptHash } from "../crypto/scrypt";
import { getMockUserEntity } from "../tests/helpers/user";

it("encrypts new password", async () => {
  const user = await getMockUserEntity();
  user.password = "password";
  user.passwordSalt = "salt";

  await user.encryptPassword();
  const valid = await verifyScryptHash(
    "password",
    user.password,
    user.passwordSalt
  );

  expect(valid).toBe(true);
});

it("does not re-encrypt new password", async () => {
  const user = await getMockUserEntity();
  user.password = "password";
  user.passwordSalt = "salt";

  await user.encryptPassword();
  await user.encryptPassword();
  const valid = await verifyScryptHash(
    "password",
    user.password,
    user.passwordSalt
  );

  expect(valid).toBe(true);
});

it("does not re-encrypt current password", async () => {
  const user = await getMockUserEntity();
  user.password = "password";
  user.loadCurrentPassword();

  await user.encryptPassword();
  expect(user.password).toBe("password");
});
