import { UserEntity } from "../../shared/entity/user.entity";

export interface AppContext {
  headers: {
    [key: string]: string;
  };
}

export interface AuthenticatedAppContext extends AppContext {
  user: UserEntity;
}

export function context({ event }: any): AppContext {
  return {
    headers: event.headers,
  };
}
