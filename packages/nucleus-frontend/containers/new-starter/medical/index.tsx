import {
  PrimaryButton,
  Button,
} from "@sdh-project-services/nucleus-ui/dist/button";
import { Fieldset } from "@sdh-project-services/nucleus-ui/dist/fieldset";
import { Label } from "@sdh-project-services/nucleus-ui/dist/label";
import { RadioButton } from "@sdh-project-services/nucleus-ui/dist/radio-button";
import { Textarea } from "@sdh-project-services/nucleus-ui/dist/textarea";
import React from "react";
import { useForm } from "react-hook-form";
import { Anchor } from "../../../components/anchor";
import { Head } from "../../../components/head";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";
import { NewStarterMedicalFormData } from "./types";

export function Medical(): React.ReactElement {
  const { handleSubmit } = useForm<NewStarterMedicalFormData>();

  return (
    <>
      <Head title="Medical Questionnaire - New Starter Form" />
      <NewStarterLayout>
        <form
          onSubmit={handleSubmit((data) => {
            /* eslint-disable-next-line no-console */
            console.log("data", data);
          })}
        >
          <Fieldset>
            <Label
              label="Do you suffer from any medical issues or ailments?"
              name="issuesRadio"
              required
            />
            <div className="flex">
              <RadioButton label="Yes" name="issuesRadio" />
              <div className="ml-4">
                <RadioButton label="No" name="issuesRadio" />
              </div>
            </div>
            <Textarea className="mt-4" name="issues" />
            <hr className="my-8 border-orange-500" />
            <Label
              label="Do you take any medication that could impair your ability to work?"
              name="medicationRadio"
              required
            />
            <div className="flex">
              <RadioButton label="Yes" name="medicationRadio" />
              <div className="ml-4">
                <RadioButton label="No" name="medicationRadio" />
              </div>
            </div>
            <Textarea className="mt-4" name="medication" />
          </Fieldset>
          <div className="flex justify-between mx-8 mt-8 md:mx-0">
            <Anchor href="/new-starter/identification">
              <Button>Back</Button>
            </Anchor>
            <PrimaryButton>Continue</PrimaryButton>
          </div>
        </form>
      </NewStarterLayout>
    </>
  );
}
