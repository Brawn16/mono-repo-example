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
        Please make sure you have the following to hand:
        <div className="pl-4 mt-8">
          <ul className="list-disc">
            <li>
              At least one of the following (preferably two):
              <ul className="pl-4 list-disc">
                <li>Passport</li>
                <li>Driving Licence</li>
                <li>Full Birth Certificate</li>
              </ul>
            </li>
            <li className="mt-4">
              At least one of the following (if you only have one of the above):
              <ul className="pl-4 list-disc">
                <li>Bank statement no more than 3 months old</li>
                <li>HMRC letter no more than 12 months old</li>
                <li>Utility bill no more than 3 months old</li>
              </ul>
            </li>
            <li className="mt-4">Qualification certifcates</li>
          </ul>
        </div>
        <div className="mx-8 mt-8 text-right md:mx-0">
          <Form />
        </div>
      </NewStarterLayout>
    </>
  );
}
