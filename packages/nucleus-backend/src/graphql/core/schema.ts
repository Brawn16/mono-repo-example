import { GraphQLSchema } from "graphql";
import { buildSchemaSync } from "type-graphql";
import { AuthResolver } from "../auth/auth.resolver";
import { UserResolver } from "../user/user.resolver";
import { WorkPackResolver } from "../work-pack/work-pack.resolver";
import { checkAuth } from "./auth";

export const resolvers = [AuthResolver, UserResolver, WorkPackResolver];

export function getSchema(): GraphQLSchema {
  return buildSchemaSync({
    authChecker: checkAuth,
    resolvers,
  });
}
