import { Authorized } from "type-graphql";

export function Public() {
  return Authorized("public");
}
