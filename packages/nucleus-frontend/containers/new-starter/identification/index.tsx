import {
  PrimaryButton,
  Button
} from "@sdh-project-services/nucleus-ui/dist/button";
import { Fieldset } from "@sdh-project-services/nucleus-ui/dist/fieldset";
import { Upload } from "@sdh-project-services/nucleus-ui/dist/upload";
import React from "react";
import { useForm } from "react-hook-form";
import { Anchor } from "../../../components/anchor";
import { Head } from "../../../components/head";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";
import { NewStarterIdentificationFormData } from "./types";

const handleChange = (fileIds: string[]) => {
  /* eslint-disable-next-line no-console */
  console.log(fileIds);
};

export function Identification(): React.ReactElement {
  const { errors, handleSubmit } = useForm<NewStarterIdentificationFormData>();

  return (
    <>
      <Head title="Identification - New Starter Form" />
      <NewStarterLayout>
        <form
          onSubmit={handleSubmit(data => {
            /* eslint-disable-next-line no-console */
            console.log("data", data);
          })}
        >
          <Fieldset>
            <Upload
              error={errors.pictureId}
              label="Upload Passport"
              onChange={handleChange}
              tags={["identification"]}
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
