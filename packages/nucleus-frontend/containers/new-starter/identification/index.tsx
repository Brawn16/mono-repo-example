import React from "react";
import { Head } from "../../../components/head";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";
import { Form } from "./form";

export function Identification(): React.ReactElement {
  return (
    <>
      <Head title="Identification - New Starter Form" />
      <NewStarterLayout>
        <div className="pl-4 my-8">
          <ul className="list-disc">
            To prove you have the right to work in the UK, please provide a
            image of your Passport, National Identity Card or Biometric
            Residency Permit, and one of the following:
            <ul className="pl-4 mt-2 mb-4 list-disc">
              <li>Driving Licence</li>
              <li>Full Birth Certificate</li>
            </ul>
            If you do not have these, submit the following
            <ul className="pl-4 mt-2 mb-4 list-disc">
              <li>Bank statement no more than 3 months old</li>
              <li>HMRC letter no more than 12 months old</li>
              <li>Utility bill no more than 3 months old</li>
            </ul>
          </ul>
          * if providing Driving License upload both front and back of card
        </div>
        <Form />
      </NewStarterLayout>
    </>
  );
}
