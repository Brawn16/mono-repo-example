import { readFileSync } from "fs";
import { env } from "process";
import { ForbiddenError } from "apollo-server-core";
import { JWK, JWT } from "jose";
import { ResolverData, UnauthorizedError } from "type-graphql";
import { UserEntity } from "../../shared/entity/user.entity";
import { AuthenticatedAppContext, AppContext } from "./context";

/**
 * Create JWK instance from the private key used to sign and verify JWT tokens.
 * Note the key is replaced with a different version on deploy, the default
 * key is only used for development purposes.
 */
const path = env.GRAPHQL_JWT_KEY_PATH || "jwt.key";
const passphrase = env.GRAPHQL_JWT_KEY_PASSPHRASE || "secret";
const tokenKey = JWK.asKey({
  key: readFileSync(path),
  passphrase,
});

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function verifyAuthToken(token: string): { [key: string]: any } {
  return JWT.verify(token, tokenKey);
}

export async function getAuthUserFromContext({
  headers,
}: AppContext): Promise<UserEntity> {
  try {
    const auth = headers.Authorization || headers.authorization;
    const token = auth.slice(7);
    const decoded = verifyAuthToken(token);
    return UserEntity.findOneOrFail(decoded.sub);
  } catch (error) {
    throw new UnauthorizedError();
  }
}

export async function checkAuth(
  { context }: ResolverData<AuthenticatedAppContext>,
  roles: string[]
): Promise<boolean> {
  if (roles.includes("public") === false) {
    context.user = await getAuthUserFromContext(context);
  }

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
