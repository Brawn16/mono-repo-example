import React from "react";
import { Anchor } from "../../../components/anchor";
import { Head } from "../../../components/head";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";
import { Form } from "./form";

export function Medical(): React.ReactElement {
  return (
    <>
      <Head title="Medical - New Starter Form" />
      <NewStarterLayout title="Medical">
        <Anchor className="flex mt-4 text-black" href="/new-starter/my-photo">
          {`<`}
          <p className="underline">Back</p>
        </Anchor>

        <p className="mt-4 text-xl font-bold md:mt-8 md:text-3xl">
          Your medical issues
        </p>
        <div className="max-w-2xl my-8">
          <Form />
        </div>
      </NewStarterLayout>
    </>
  );
}
