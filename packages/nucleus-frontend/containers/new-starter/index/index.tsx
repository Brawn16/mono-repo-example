import { Panel } from "@sdh-project-services/nucleus-ui/dist/panel";
import React from "react";
import {
  AiOutlineIdcard,
  AiOutlineFileText,
  AiOutlineSolution,
} from "react-icons/ai";
import { Head } from "../../../components/head";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";
import { Form } from "./form";

export function NewStarter() {
  const header = (
    <>
      <h2 className="text-2xl font-extrabold md:text-3xl font-montserrat">
        Before you start
      </h2>
      <h3 className="text-lg">Please confirm you have the following:</h3>
    </>
  );

  return (
    <>
      <Head title="New Starter Form" />
      <NewStarterLayout header={header} title="Preparation">
        <Panel>
          <div className="flex">
            <AiOutlineIdcard className="flex-shrink-0 hidden text-5xl text-gray-400 md:block" />
            <div className="ml-4">
              <strong>At least one of the following:</strong>
              <ul className="pl-8 mt-2 text-gray-500 list-disc space-y-2">
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
            </div>
          </div>
        </Panel>
        <Panel className="my-8">
          <div className="flex">
            <AiOutlineFileText className="flex-shrink-0 hidden text-5xl text-gray-400 md:block" />
            <div className="ml-4">
              <strong>At least one of the following:</strong>
              <ul className="pl-8 mt-2 text-gray-500 list-disc space-y-2">
                <li>Bank statement no more than 3 months old</li>
                <li>HMRC letter no more than 12 months old</li>
                <li>Utility bill no more than 3 months old</li>
                <li>UK Driving License</li>
              </ul>
            </div>
          </div>
        </Panel>
        <Panel>
          <div className="flex">
            <AiOutlineSolution className="flex-shrink-0 hidden text-5xl text-gray-400 md:block" />
            <strong className="ml-4">
              All relevant qualifications and training information
            </strong>
          </div>
        </Panel>
        <Form />
      </NewStarterLayout>
    </>
  );
}
