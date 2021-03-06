import React from "react";
import { Head } from "../../../components/head";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";
import { Form } from "./form";

export function WorkDetails() {
  return (
    <>
      <Head title="Work Details - New Starter Form" />
      <NewStarterLayout headerTitle="Your work details" title="Work Details">
        <Form />
      </NewStarterLayout>
    </>
  );
}
