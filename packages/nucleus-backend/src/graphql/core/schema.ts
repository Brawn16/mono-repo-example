import { buildSchemaSync } from "type-graphql";
import { getMetadataStorage } from "type-graphql/dist/metadata/getMetadataStorage";
import * as resolvers from "../resolvers";
import { checkAuth } from "./auth";

// Loop through registered query and mutation, marking
// each one as needing authorization
const metadata = getMetadataStorage();
const { mutations, queries } = metadata;
[...mutations, ...queries].forEach(({ methodName, target }) => {
  metadata.collectAuthorizedFieldMetadata({
    fieldName: methodName,
    roles: [],
    target,
  });
});

// Build and export schema
export const schema = buildSchemaSync({
  authChecker: checkAuth,
  resolvers: Object.values(resolvers),
});
