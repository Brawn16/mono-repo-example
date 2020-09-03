import React from "react";
import { Head } from "../../../components/head";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";
import { Form } from "./form";

export function Summary() {
  return (
    <>
      <Head title="Summary - New Starter Form" />
      <NewStarterLayout headerTitle="Summary" title="Summary">
        <Form />
      </NewStarterLayout>
    </>
  );
}
