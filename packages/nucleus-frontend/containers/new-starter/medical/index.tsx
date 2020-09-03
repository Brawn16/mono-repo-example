import React from "react";
import { Head } from "../../../components/head";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";
import { Form } from "./form";

export function Medical() {
  return (
    <>
      <Head title="Medical - New Starter Form" />
      <NewStarterLayout headerTitle="Your medical information" title="Medical">
        <Form />
      </NewStarterLayout>
    </>
  );
}
