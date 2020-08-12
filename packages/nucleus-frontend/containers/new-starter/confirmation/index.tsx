import React from "react";
import { Head } from "../../../components/head";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";

export function Confirmation(): React.ReactElement {
  return (
    <>
      <Head title="Confirmation - New Starter Form" />
      <NewStarterLayout showSteps={false}>
        Congratulations. You have now completed the Online Onboarding We are
        dealing with your application and will notify you of the outcome via
        contact details provided within X working days.
        <div className="mt-4">
          If for any reason, we are unable to meet the deadline or require
          further information, we will contact you.
        </div>
        <div className="mt-4 font-bold">Thank you! You are all done.</div>
      </NewStarterLayout>
    </>
  );
}
