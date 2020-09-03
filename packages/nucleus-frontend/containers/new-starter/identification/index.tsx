import { Panel } from "@sdh-project-services/nucleus-ui/dist/panel";
import React from "react";
import { Head } from "../../../components/head";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";
import { Form } from "./form";

export function Identification() {
  return (
    <>
      <Head title="Identification - New Starter Form" />
      <NewStarterLayout
        headerTitle="Your Identification"
        title="Identification"
      >
        <Panel>
          <strong>
            To prove you have the right to work in the UK, please provide a
            Valid (must be in date) copy of one of the following:
          </strong>
          <ul className="pl-8 mt-2 text-gray-500 list-disc space-y-2">
            <li>UK/EEA Passport </li>
            <li>UK/EEA National identity card</li>
            <li>Non-UK passport (Photo page and Work permit Page)</li>
            <li>Biometric Residence Permit (with right to work)</li>
            <li>
              UK Birth Certificate with Photo ID (3) (Passport sized photo that
              is countersigned on the back by someone who can confirm your
              identity)
            </li>
          </ul>
        </Panel>
        <Panel className="mt-4">
          <strong>
            To confirm your address, please submit one of the following:
          </strong>
          <ul className="pl-8 mt-2 text-gray-500 list-disc space-y-2">
            <li>
              Bank statement no more than 3 months old (relevant Address showing
              date page)
            </li>
            <li>
              HMRC letter no more than 12 months old (relevant Address showing
              date page)
            </li>
            <li>
              Utility bill no more than 3 months old (relevant Address showing
              date page)
            </li>
            <li>
              UK Driving License (please upload both front and back of card)
            </li>
          </ul>
        </Panel>
        <Form />
      </NewStarterLayout>
    </>
  );
}
