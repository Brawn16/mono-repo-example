import { createSandbox } from "sinon";
import { UserEntity } from "../../shared/entity/user.entity";
import { stubEntity } from "../../shared/tests/helpers/entity";
import { getMockUserEntity } from "../../shared/tests/helpers/user";
import { UserResolver } from "./user.resolver";

const { restore, stub } = createSandbox();
afterEach(async () => restore());

it("returns all users", async () => {
  const users = [await getMockUserEntity()];
  stubEntity(stub, UserEntity, users);

  const result = await new UserResolver().users();
  expect(result).toBe(users);
});

it("returns single user", async () => {
  const user = await getMockUserEntity();
  stubEntity(stub, UserEntity, [user]);

  const result = await new UserResolver().user("id");
  expect(result).toBe(user);
});

it("creates a user", async () => {
  const user = await getMockUserEntity();
  const { save } = stubEntity(stub, UserEntity, [user]);

  const result = await new UserResolver().createUser({ email: "created" });
  expect(save.called);
  expect(result).toMatchObject({ email: "created" });
});

it("updates a user", async () => {
  const user = await getMockUserEntity();
  const { save } = stubEntity(stub, UserEntity, [user]);

  const result = await new UserResolver().updateUser("id", {
    email: "updated"
  });
  expect(save.called);
  expect(result).toMatchObject({ ...user, email: "updated" });
});

it("deletes a user", async () => {
  const user = await getMockUserEntity();
  const { deleteEntity } = stubEntity(stub, UserEntity, [user]);

  const result = await new UserResolver().deleteUser("id");
  expect(deleteEntity.called).toBe(true);
  expect(result).toBe(true);
});
