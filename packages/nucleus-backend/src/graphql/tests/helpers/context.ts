import { getMockUserEntity } from "../../../shared/tests/helpers/user";
import { createAuthToken } from "../../core/auth";
import { AuthenticatedAppContext } from "../../core/context";

export function getMockContext(
  headers: {
    [key: string]: string;
  } = {}
) {
  return {
    headers,
  };
}

export async function getMockAuthenticatedAppContext(
  headers: {
    [key: string]: string;
  } = {}
): Promise<AuthenticatedAppContext> {
  const user = await getMockUserEntity();
  const token = createAuthToken(user);

  return {
    headers: {
      authorization: `Bearer ${token}`,
      ...headers,
    },
    user,
  };
}
