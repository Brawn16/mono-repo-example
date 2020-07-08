import { ForbiddenError } from "apollo-server-core";
import { JWT } from "jose";
import { createSandbox } from "sinon";
import { ResolverData, UnauthorizedError } from "type-graphql";
import { UserEntity } from "../../shared/entity/user.entity";
import { stubEntity } from "../../shared/tests/helpers/entity";
import { getMockUserEntity } from "../../shared/tests/helpers/user";
import { getMockRequest } from "../tests/helpers/request";
import {
  checkAuth,
  createAuthToken,
  getAuthUserFromRequest,
  verifyAuthToken
} from "./auth";
import { AuthenticatedAppContext } from "./context";

const { restore, stub } = createSandbox();
afterEach(async () => restore());

it("checks auth", async () => {
  const user = await getMockUserEntity();
  stubEntity(stub, UserEntity, [user]);

  const token = createAuthToken(user);
  const resolverData = {
    context: {
      request: getMockRequest({
        headers: { authorization: `Bearer ${token}` }
      }),
      user: new UserEntity()
    }
  } as ResolverData<AuthenticatedAppContext>;

  await checkAuth(resolverData);
  expect(resolverData.context.user).toMatchObject(user);
});

it("creates auth token", async () => {
  const timestamp = new Date().getTime() / 1000 + 86400;
  const user = await getMockUserEntity();
  stubEntity(stub, UserEntity, [user]);

  const token = createAuthToken(user);
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const decoded: { [key: string]: any } = JWT.decode(token);
  expect(decoded.exp).toBeGreaterThan(timestamp - 1);
  expect(decoded.exp).toBeLessThan(timestamp + 1);
  expect(decoded.sub).toBe("id");
});

it("cannot create auth token with inactive user", async () => {
  const user = await getMockUserEntity();
  stubEntity(stub, UserEntity, [user]);
  user.isActive = false;
  user.isVerified = true;

  const result = () => createAuthToken(user);
  expect(result).toThrow(new ForbiddenError("User is inactive."));
});

it("cannot create auth token with unverified user", async () => {
  const user = await getMockUserEntity();
  stubEntity(stub, UserEntity, [user]);
  user.isActive = true;
  user.isVerified = false;

  const result = () => createAuthToken(user);
  expect(result).toThrow(new ForbiddenError("User is unverified."));
});

it("gets auth user from request", async () => {
  const user = await getMockUserEntity();
  stubEntity(stub, UserEntity, [user]);

  const token = createAuthToken(user);
  const request = getMockRequest({
    headers: { authorization: `Bearer ${token}` }
  });

  const result = await getAuthUserFromRequest(request);
  expect(result).toBe(user);
});

it("throws exception when no token is in request", async () => {
  const request = getMockRequest();

  const result = getAuthUserFromRequest(request);
  expect(result).rejects.toThrow(UnauthorizedError);
});

it("throws exception when invalid token is in request", async () => {
  const request = getMockRequest({
    headers: { authorization: `Bearer invalid` }
  });

  const result = getAuthUserFromRequest(request);
  expect(result).rejects.toThrow(UnauthorizedError);
});

it("verifies a valid token", async () => {
  const timestamp = new Date().getTime() / 1000 + 86400;
  const user = await getMockUserEntity();

  const token = createAuthToken(user);
  const decoded = verifyAuthToken(token);
  expect(decoded.exp).toBeGreaterThan(timestamp - 1);
  expect(decoded.exp).toBeLessThan(timestamp + 1);
  expect(decoded.sub).toBe("id");
});
