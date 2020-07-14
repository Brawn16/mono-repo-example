import {
  ApolloProvider,
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink
} from "@apollo/client";
import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { CookiesProvider } from "react-cookie";
import { Cookies } from "./cookies";

const cookies = new Cookies();

export const authLink = new ApolloLink((operation, forward) => {
  const token = cookies.get("token");

  if (token) {
    operation.setContext((context: Record<string, any>) => ({
      ...context,
      headers: {
        ...context.headers,
        authorization: `Bearer ${token}`
      }
    }));
  }

  return forward(operation);
});

export const httpLink = new HttpLink({
  uri: "http://localhost:5000/dev/graphql"
});

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([authLink, httpLink]),
  ssrMode: true
});

export function App({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <CookiesProvider cookies={cookies}>
      <ApolloProvider client={apolloClient}>
        <Head>
          <link href="/favicon.ico" rel="icon" />
          <link href="//rsms.me/inter/inter.css" rel="stylesheet" />
        </Head>
        <Component {...pageProps} />
      </ApolloProvider>
    </CookiesProvider>
  );
}
