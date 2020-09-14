import React from "react";
import { Head } from "../../../components/head";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";

export function Confirmation() {
  return (
    <>
      <Head title="Confirmation - New Starter Form" />
      <NewStarterLayout showSteps={false} title="New Starter Confirmation">
        Congratulations, you have now completed the online onboarding. We are
        dealing with your application and will notify you of the outcome via
        contact details provided within 7 working days.
        <div className="mt-4">
          If for any reason, we are unable to meet the deadline or require
          further information, we will contact you.
        </div>
        <div className="mt-4 font-bold">Thank you! You are all done.</div>
      </NewStarterLayout>
    </>
  );
}
