import React from "react";
import { Head } from "../../../components/head";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";
import { Form } from "./form";

export function Identification() {
  return (
    <>
      <Head title="Identification - New Starter Form" />
      <NewStarterLayout
        headerTitle="Your Identification"
        title="Identification"
      >
        <Form />
      </NewStarterLayout>
    </>
  );
}
