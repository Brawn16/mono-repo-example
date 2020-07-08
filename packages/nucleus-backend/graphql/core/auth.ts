import { readFileSync } from "fs";
import { env } from "process";
import { HttpRequest } from "@azure/functions";
import { ForbiddenError } from "apollo-server-core";
import { JWK, JWT } from "jose";
import { ResolverData, UnauthorizedError } from "type-graphql";
import { UserEntity } from "../../shared/entity/user.entity";
import { AuthenticatedAppContext } from "./context";

/**
 * Create JWK instance from the private key used to sign and verify JWT tokens.
 * Note the key is replaced with a different version on deploy, the default
 * key is only used for development purposes.
 */
const path = env.GRAPHQL_JWT_KEY_PATH || "graphql/jwt.key";
const passphrase = env.GRAPHQL_JWT_KEY_PASSPHRASE || "secret";
const tokenKey = JWK.asKey({
  key: readFileSync(path),
  passphrase
});

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function verifyAuthToken(token: string): { [key: string]: any } {
  return JWT.verify(token, tokenKey);
}

export async function getAuthUserFromRequest({
  headers: { authorization = "" }
}: HttpRequest): Promise<UserEntity> {
  try {
    const token = authorization.slice(7);
    const decoded = verifyAuthToken(token);
    return UserEntity.findOneOrFail(decoded.sub);
  } catch (error) {
    throw new UnauthorizedError();
  }
}

export async function checkAuth({
  context
}: ResolverData<AuthenticatedAppContext>): Promise<boolean> {
  /* eslint-disable-next-line no-param-reassign */
  context.user = await getAuthUserFromRequest(context.request);
  return true;
}

export function createAuthToken(
  { id: sub, isActive, isVerified }: UserEntity,
  expiresIn = "12 hours"
): string {
  if (!isActive) {
    throw new ForbiddenError("User is inactive.");
  }

  if (!isVerified) {
    throw new ForbiddenError("User is unverified.");
  }

  return JWT.sign({ sub }, tokenKey, { expiresIn });
}
