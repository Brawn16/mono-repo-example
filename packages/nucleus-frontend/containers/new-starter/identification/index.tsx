import React from "react";
import { Head } from "../../../components/head";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";
import { Form } from "./form";

export function Identification() {
  const header = (
    <>
      <h2 className="text-2xl font-extrabold md:text-3xl font-montserrat">
        Your identification
      </h2>
      <h3 className="text-lg">
        To work with us, you need to provide a form of identification and proof
        of address. Please make sure your photos aren&apos;t blurry.
      </h3>
    </>
  );

  return (
    <>
      <Head title="Identification - New Starter Form" />
      <NewStarterLayout header={header} title="Identification">
        <Form />
      </NewStarterLayout>
    </>
  );
}
