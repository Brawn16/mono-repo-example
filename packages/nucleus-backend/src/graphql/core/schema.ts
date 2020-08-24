import { GraphQLSchema } from "graphql";
import { buildSchemaSync } from "type-graphql";
import { AddressLookupResolver } from "../address-lookup/address-lookup.resolver";
import { AuthResolver } from "../auth/auth.resolver";
import { OperativeResolver } from "../operative/operative.resolver";
import { SubcontractorResolver } from "../subcontractor/subcontractor.resolver";
import { UploadResolver } from "../upload/upload.resolver";
import { UserResolver } from "../user/user.resolver";
import { WorkPackResolver } from "../work-pack/work-pack.resolver";
import { WorkstreamResolver } from "../workstream/workstream.resolver";
import { checkAuth } from "./auth";

export const resolvers = [
  AddressLookupResolver,
  AuthResolver,
  OperativeResolver,
  SubcontractorResolver,
  UploadResolver,
  UserResolver,
  WorkPackResolver,
  WorkstreamResolver,
];

export function getSchema(): GraphQLSchema {
  return buildSchemaSync({
    authChecker: checkAuth,
    resolvers,
  });
}
