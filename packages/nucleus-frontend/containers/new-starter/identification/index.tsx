import { Fieldset } from "@sdh-project-services/nucleus-ui/dist/fieldset";
import React from "react";
import { Head } from "../../../components/head";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";
import { Form } from "./form";

export function Identification(): React.ReactElement {
  return (
    <>
      <Head title="Identification - New Starter Form" />
      <NewStarterLayout backHref="/new-starter/address" title="Identification">
        <p className="mt-4 text-xl font-bold md:mt-8 md:text-3xl">
          Your identification
        </p>
        <div className="max-w-2xl my-8">
          <Fieldset className="my-4">
            <p className="font-semibold">
              To prove you have the right to work in the UK, please provide a
              Valid (must be in date) copy of one of the following:
            </p>
            <ul className="py-4 ml-6 text-gray-500 list-disc">
              <li>UK/EEA Passport </li>
              <li>UK/EEA National identity card</li>
              <li>Non-UK passport (Photo page and Work permit Page)</li>
              <li>Biometric Residence Permit (with right to work)</li>
              <li>
                UK Birth Certificate with Photo ID (3) (Passport sized photo
                that is countersigned on the back by someone who can confirm
                your identity)
              </li>
            </ul>
          </Fieldset>
          <Fieldset className="my-4">
            <p className="font-semibold">
              To confirm your address, please submit one of the following:
            </p>
            <ul className="py-4 ml-6 text-gray-500 list-disc">
              <li>
                Bank statement no more than 3 months old (relevant Address
                showing date page)
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
          </Fieldset>
        </div>
        <Form />
      </NewStarterLayout>
    </>
  );
}
