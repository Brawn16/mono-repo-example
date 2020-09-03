import React from "react";
import { Head } from "../../../components/head";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";
import { Form } from "./form";

export function Medical() {
  return (
    <>
      <Head title="Medical - New Starter Form" />
      <NewStarterLayout backHref="/new-starter/my-photo" title="Medical">
        <p className="mt-4 text-xl font-bold md:mt-8 md:text-3xl">
          Your medical issues
        </p>
        <div className="max-w-2xl my-8">
          <Form />
        </div>
      </NewStarterLayout>
    </>
  );
}
