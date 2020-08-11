import React from "react";
import { Head } from "../../../components/head";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";
import { Form } from "./form";

export function AddressDetails() {
  return (
    <>
      <Head title="Address - New Starter Form" />
      <NewStarterLayout>
        <Form />
      </NewStarterLayout>
    </>
  );
}
