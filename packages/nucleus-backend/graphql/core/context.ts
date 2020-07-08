import { HttpRequest } from "@azure/functions";
import { UserEntity } from "../../shared/entity/user.entity";

export interface AppContext {
  request: HttpRequest;
}

export interface AuthenticatedAppContext extends AppContext {
  user: UserEntity;
}

export function context({ request }: { request: HttpRequest }): AppContext {
  return { request };
}
