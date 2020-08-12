import React from "react";
import { Head } from "../../../components/head";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";
import { Form } from "./form";

export function Medical(): React.ReactElement {
  return (
    <>
      <Head title="Medical Questionnaire - New Starter Form" />
      <NewStarterLayout>
        <Form />
      </NewStarterLayout>
    </>
  );
}
