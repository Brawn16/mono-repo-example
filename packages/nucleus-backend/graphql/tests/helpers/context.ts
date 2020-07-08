import { getMockUserEntity } from "../../../shared/tests/helpers/user";
import { createAuthToken } from "../../core/auth";
import { AuthenticatedAppContext } from "../../core/context";
import { getMockRequest } from "./request";

export async function getMockAuthenticatedAppContext(): Promise<
  AuthenticatedAppContext
> {
  const user = await getMockUserEntity();
  const token = createAuthToken(user);
  const headers = {
    authorization: `Bearer ${token}`,
  };

  return {
    request: getMockRequest({ headers }),
    user,
  };
}
