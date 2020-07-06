import {
  ApolloProvider,
  ApolloClient,
  ApolloLink,
  InMemoryCache,
} from "@apollo/client";
import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { CookiesProvider } from "react-cookie";
import { authLink } from "./auth-link";
import { Cookies } from "./cookies";
import { httpLink } from "./http-link";

const cookies = new Cookies();
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
          <link href="//rsms.me/inter/inter.css" rel="stylesheet" />
        </Head>
        <Component {...pageProps} />
      </ApolloProvider>
    </CookiesProvider>
  );
}
