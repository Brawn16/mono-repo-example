import React from "react";
import { Head } from "../../../components/head";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";
import { Form } from "./form";

export function Summary(): React.ReactElement {
  return (
    <>
      <Head title="Summary - New Starter Form" />
      <NewStarterLayout backHref="/new-starter/medical" title="Summary">
        <div className="max-w-2xl">
          <p className="mt-4 text-xl font-bold md:mt-8 md:text-3xl">Summary</p>
          <Form />
        </div>
      </NewStarterLayout>
    </>
  );
}
