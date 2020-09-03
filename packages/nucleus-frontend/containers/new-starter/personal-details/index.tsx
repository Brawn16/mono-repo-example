import React from "react";
import { Head } from "../../../components/head";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";
import { Form } from "./form";

export function PersonalDetails() {
  return (
    <>
      <Head title="Personal Details - New Starter Form" />
      <NewStarterLayout
        backHref="/new-starter"
        headerTitle="Your details"
        title="Personal Details"
      >
        <Form />
      </NewStarterLayout>
    </>
  );
}
