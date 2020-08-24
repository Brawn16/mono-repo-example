import React from "react";
import { Anchor } from "../../../components/anchor";
import { Head } from "../../../components/head";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";
import { Form } from "./form";

export function WorkDetails(): React.ReactElement {
  return (
    <>
      <Head title="Work Details - New Starter Form" />
      <NewStarterLayout title="Work Details">
        <Anchor className="flex mt-4" href="/new-starter/address">
          {`<`}
          <p className="underline">Back</p>
        </Anchor>
        <p className="mt-4 text-xl font-bold md:mt-8 md:text-3xl">
          Your work details
        </p>
        <Form />
      </NewStarterLayout>
    </>
  );
}
