import Router from "next/router";
import React from "react";
import { Anchor } from "../../components/anchor";
import { Head } from "../../components/head";
import { CenterPage } from "../../layouts/center-page";

export function PageNotFound(): React.ReactElement {
  return (
    <>
      <Head title="Page not found" />
      <CenterPage>
        <h1 className="text-2xl font-extrabold md:text-3xl">Page not found</h1>
        <p className="text-gray-600">
          Sorry, we can&apos;t find the requested page.
        </p>
        <button
          className="mt-8 font-medium text-blue-600 focus:outline-none hover:text-blue-500 duration-150 ease-in-out transition"
          onClick={() => Router.back()}
          type="button"
        >
          Go Back &rarr;
        </button>
        <Anchor
          className="pl-2 mt-8 ml-2 text-blue-600 border-l hover:text-blue-500"
          href="/dashboard"
        >
          Dashboard &rarr;
        </Anchor>
      </CenterPage>
    </>
  );
}
