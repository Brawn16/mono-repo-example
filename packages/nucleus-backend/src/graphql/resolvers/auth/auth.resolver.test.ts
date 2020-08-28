import { ForbiddenError } from "apollo-server-core";
import { createSandbox } from "sinon";
import { UserEntity } from "../../../shared/entity/user.entity";
import { stubEntity } from "../../../shared/tests/helpers/entity";
import { getMockUserEntity } from "../../../shared/tests/helpers/user";
import { getMockAuthenticatedAppContext } from "../../tests/helpers/context";
import { AuthResolver } from "./auth.resolver";

const { restore, stub } = createSandbox();
afterEach(async () => restore());

it("returns current user", async () => {
  const context = await getMockAuthenticatedAppContext();

  const result = new AuthResolver().currentUser(context);
  expect(result).toBe(context.user);
});

it("logs in with valid password", async () => {
  const user = await getMockUserEntity();
  stubEntity(stub, UserEntity, [user]);

  const result = await new AuthResolver().login("email", "password");
  expect(result.token).toBeTruthy();
  expect(result.user).toBe(user);
});

it("cannot login with invalid password", async () => {
  const user = await getMockUserEntity();
  stubEntity(stub, UserEntity, [user]);

  const result = new AuthResolver().login("email", "invalid");
  expect(result).rejects.toThrow(
    new ForbiddenError("The login details supplied are invalid.")
  );
});

it("cannot login with blank password", async () => {
  const user = await getMockUserEntity();
  stubEntity(stub, UserEntity, [user]);
  user.password = "";

  const result = new AuthResolver().login("email", "invalid");
  expect(result).rejects.toThrow(
    new ForbiddenError("The login details supplied are invalid.")
  );
});

it("cannot login with inactive user", async () => {
  const user = await getMockUserEntity();
  stubEntity(stub, UserEntity, [user]);
  user.isActive = false;

  const result = new AuthResolver().login("email", "password");
  expect(result).rejects.toThrow(
    new ForbiddenError(
      "This user is disabled, please contact for support for assistance."
    )
  );
});

it("cannot login with unverified user", async () => {
  const user = await getMockUserEntity();
  stubEntity(stub, UserEntity, [user]);
  user.isVerified = false;

  const result = new AuthResolver().login("email", "password");
  expect(result).rejects.toThrow(
    new ForbiddenError("Please verify your email to use this login.")
  );
});
