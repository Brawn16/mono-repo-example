import React from "react";
import { Head } from "../../../components/head";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";
import { Form } from "./form";

export function AddressDetails() {
  return (
    <>
      <Head title="Address - New Starter Form" />
      <NewStarterLayout
        backHref="/new-starter/personal-details"
        headerTitle="What is your home address?"
        title="Address"
      >
        <Form />
      </NewStarterLayout>
    </>
  );
}
