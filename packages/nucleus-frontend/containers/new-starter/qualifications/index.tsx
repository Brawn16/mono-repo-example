import React from "react";
import { Head } from "../../../components/head";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";
import { Form } from "./form";

export function Qualifications() {
  const header = (
    <>
      <h2 className="text-2xl font-extrabold md:text-3xl font-montserrat">
        Your qualifications
      </h2>
      <h3 className="text-lg">
        Please upload all relevant qualifications, training certificates,
        professional competencies or any other documentary evidence confirming
        that you possess the skills and training to practice your profession.
      </h3>
    </>
  );

  return (
    <>
      <Head title="Qualifications - New Starter Form" />
      <NewStarterLayout header={header} title="Qualifications">
        <Form />
      </NewStarterLayout>
    </>
  );
}
