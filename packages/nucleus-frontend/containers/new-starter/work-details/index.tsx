import {
  PrimaryButton,
  Button,
} from "@sdh-project-services/nucleus-ui/dist/button";
import { Fieldset } from "@sdh-project-services/nucleus-ui/dist/fieldset";
import { Select } from "@sdh-project-services/nucleus-ui/dist/select";
import React from "react";
import { useForm } from "react-hook-form";
import { Anchor } from "../../../components/anchor";
import { Head } from "../../../components/head";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";
import { NewStarterWorkDetailsFormData } from "./types";

export function WorkDetails(): React.ReactElement {
  const { register, handleSubmit, errors } = useForm<
    NewStarterWorkDetailsFormData
  >();
  return (
    <>
      <Head title="Work Details - New Starter Form" />
      <NewStarterLayout>
        <form
          onSubmit={handleSubmit((data) => {
            /* eslint-disable-next-line no-console */
            console.log("data", data);
          })}
        >
          <Fieldset>
            <Select
              componentRef={register({
                required: "Workstream is required",
              })}
              error={errors.workstream}
              label="Workstream"
              name="workstream"
              options={[]}
              required
            />
            <hr className="my-8 border-orange-500" />
            <Select
              componentRef={register({
                required: "Subcontractor is required",
              })}
              error={errors.workstream}
              label="Subcontractor"
              name="subcontractor"
              options={[]}
              required
            />
          </Fieldset>
          <div className="flex justify-between mx-8 mt-8 md:mx-0">
            <Anchor href="/new-starter/address">
              <Button>Back</Button>
            </Anchor>
            <PrimaryButton>Continue</PrimaryButton>
          </div>
        </form>
      </NewStarterLayout>
    </>
  );
}
