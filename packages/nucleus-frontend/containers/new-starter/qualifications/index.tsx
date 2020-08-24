import { Fieldset } from "@sdh-project-services/nucleus-ui/dist/fieldset";
import React from "react";
import { Anchor } from "../../../components/anchor";
import { Head } from "../../../components/head";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";
import { Form } from "./form";

export function Qualifications(): React.ReactElement {
  return (
    <>
      <Head title="Qualifications - New Starter Form" />
      <NewStarterLayout title="Qualifications">
        <Anchor
          className="flex mt-4 text-black"
          href="/new-starter/work-details"
        >
          {`<`}
          <p className="underline">Back</p>
        </Anchor>

        <p className="mt-4 text-xl font-bold md:mt-8 md:text-3xl">
          Your qualifications
        </p>
        <div className="max-w-2xl my-8">
          <Fieldset>
            Please upload all relevant qualifications, training certificates,
            professional competencies or any other documentary evidence
            confirming that you possess the skills and training to practice your
            profession.
            <div className="mt-4">
              All uploads must be from a UK recognised competent
              authority/professional body/licensed body.
            </div>
          </Fieldset>
        </div>
        <Form />
      </NewStarterLayout>
    </>
  );
}
