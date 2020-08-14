import React from "react";
import { Head } from "../../../components/head";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";
import { Form } from "./form";

export function Summary(): React.ReactElement {
  return (
    <>
      <Head title="Summary - New Starter Form" />
      <NewStarterLayout title="Summary">
        <Form />
      </NewStarterLayout>
    </>
  );
}
