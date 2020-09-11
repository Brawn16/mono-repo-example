import React from "react";
import { Head } from "../../../components/head";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";

export function PrivacyPolicy() {
  return (
    <>
      <Head title="Privacy Policy - New Starter Form" />
      <NewStarterLayout showSteps={false} title="Privacy policy">
        privacy policy goes here
      </NewStarterLayout>
    </>
  );
}
