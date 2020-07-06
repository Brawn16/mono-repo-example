import { ApolloLink } from "@apollo/client";

export const authLink = new ApolloLink((operation, forward) => {
  return forward(operation);
});
