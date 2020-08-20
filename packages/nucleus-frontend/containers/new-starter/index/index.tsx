import { Fieldset } from "@sdh-project-services/nucleus-ui/dist/fieldset";
import React from "react";
import { FaRegIdCard, FaAward } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import { Head } from "../../../components/head";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";
import { Form } from "./form";

export function NewStarter(): React.ReactElement {
  return (
    <>
      <Head title="New Starter Form" />
      <NewStarterLayout>
        <h2 className="py-5 text-xl font-bold md:text-3xl">Before you start</h2>
        <p className="font-semibold">Please confirm you have the following:</p>
        <div className="max-w-2xl mt-4">
          <Fieldset>
            <div className="flex">
              <FaRegIdCard className="text-5xl text-gray-400" />
              <div className="px-4 pt-1">
                <p className="font-semibold">At least one of the following:</p>
                <ul className="pl-4 ml-6 text-gray-500 list-disc">
                  <li>UK/EEA Passport</li>
                  <li>UK/EEA National identity card</li>
                  <li>Non-UK Passport (with work permit)</li>
                  <li>Biometric Residence Permit (with work permit)</li>
                  <li>
                    UK Birth Certificate with Photo ID (passport sized photo
                    that is countersigned on the back by someone who can confirm
                    your identity)
                  </li>
                </ul>
              </div>
            </div>
          </Fieldset>
          <Fieldset className="my-4">
            <div className="flex">
              <FiFileText className="text-5xl text-gray-400" />
              <div className="px-4 pt-1">
                <p className="font-semibold">At least one of the following:</p>
                <ul className="pl-4 ml-6 text-gray-500 list-disc">
                  <li>Bank statement no more than 3 months old</li>
                  <li>HMRC letter no more than 12 months old</li>
                  <li>Utility bill no more than 3 months old</li>
                  <li>UK Driving License</li>
                </ul>
              </div>
            </div>
          </Fieldset>
          <Fieldset>
            <div className="flex ">
              <FaAward className="text-5xl text-gray-400" />
              <p className="px-4 font-semibold">
                All relevant qualifications and training information
              </p>
            </div>
          </Fieldset>
        </div>
        <div className="mt-8 text-right">
          <Form />
        </div>
      </NewStarterLayout>
    </>
  );
}
