import React from "react";
import { Head } from "../../../components/head";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";

export function TermsAndConditions() {
  return (
    <>
      <Head title="Terms and conditions - New Starter Form" />
      <NewStarterLayout showSteps={false} title="Terms and conditions">
        terms and coditions go here
      </NewStarterLayout>
    </>
  );
}
