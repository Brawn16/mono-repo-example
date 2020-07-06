import React from "react";
import { Head } from "../../components/head";
import { Application } from "../../layouts/application";

export function Dashboard(): React.ReactElement {
  return (
    <>
      <Head title="Dashboard" />
      <Application />
    </>
  );
}
