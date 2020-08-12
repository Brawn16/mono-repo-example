import React from "react";
import { Head } from "../../../components/head";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";
import { Form } from "./form";

export function NewStarter(): React.ReactElement {
  return (
    <>
      <Head title="New Starter Form" />
      <NewStarterLayout>
        <h2 className="font-bold uppercase">Before You Start</h2>
        Please confirm you have the following:
        <div className="pl-4 mt-4">
          <ul className="list-disc">
            <li>
              At least one of the following:
              <ul className="pl-4 list-disc">
                <li>UK/EEA Passport</li>
                <li>UK/EEA National identity card</li>
                <li>Non-UK Passport (with work permit)</li>
                <li>Biometric Residence Permit (with work permit)</li>
                <li>
                  UK Birth Certificate with Photo ID (passport sized photo that
                  is countersigned on the back by someone who can confirm your
                  identity)
                </li>
              </ul>
            </li>
            <li className="mt-4">
              At least one of the following:
              <ul className="pl-4 list-disc">
                <li>Bank statement no more than 3 months old</li>
                <li>HMRC letter no more than 12 months old</li>
                <li>Utility bill no more than 3 months old</li>
                <li>UK Driving License</li>
              </ul>
            </li>
            <li className="mt-4">
              All relevant qualifications and training information
            </li>
          </ul>
        </div>
        <div className="mt-8 text-right">
          <Form />
        </div>
      </NewStarterLayout>
    </>
  );
}
