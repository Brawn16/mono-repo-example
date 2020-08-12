import React from "react";
import { Head } from "../../../components/head";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";
import { Form } from "./form";

export function Qualifications(): React.ReactElement {
  return (
    <>
      <Head title="Qualifications - New Starter Form" />
      <NewStarterLayout>
        <div className="mb-8">
          Please upload all relevant qualifications, training certificates,
          professional competencies or any other documentary evidence confirming
          that you possess the skills and training to practice your profession.
          <div className="mt-4">
            All uploads must be from a UK recognised competent
            authority/professional body/licensed body.
          </div>
        </div>
        <Form />
      </NewStarterLayout>
    </>
  );
}
