import {
  ApolloProvider,
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  HttpLink,
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
        authorization: `Bearer ${token}`,
      },
    }));
  }

  return forward(operation);
});

export const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_APOLLO_URI,
});

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([authLink, httpLink]),
  ssrMode: true,
});

export function App({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <CookiesProvider cookies={cookies}>
      <ApolloProvider client={apolloClient}>
        <Head>
          <link href="/favicon.ico" rel="icon" />
          <link
            href="//fonts.googleapis.com/css?family=Lato:100,200,300,400,500,600,700,800,900|Montserrat:100,200,300,400,500,600,700,800,900"
            rel="stylesheet"
          />
        </Head>
        <Component {...pageProps} />
      </ApolloProvider>
    </CookiesProvider>
  );
}
