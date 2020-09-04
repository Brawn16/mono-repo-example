import React from "react";
import { Head } from "../../../components/head";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";
import { Form } from "./form";

export function Summary() {
  const header = (
    <>
      <h2 className="text-2xl font-extrabold md:text-3xl font-montserrat">
        Summary
      </h2>
      <h3 className="text-lg">
        Please review the information you provided and make sure it is correct
        before submitting the form.
      </h3>
    </>
  );

  return (
    <>
      <Head title="Summary - New Starter Form" />
      <NewStarterLayout header={header} title="Summary">
        <Form />
      </NewStarterLayout>
    </>
  );
}
