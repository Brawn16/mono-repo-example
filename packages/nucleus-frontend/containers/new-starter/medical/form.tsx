import {
  PrimaryButton,
  Button,
} from "@sdh-project-services/nucleus-ui/dist/button";
import { Label } from "@sdh-project-services/nucleus-ui/dist/label";
import { RadioButton } from "@sdh-project-services/nucleus-ui/dist/radio-button";
import { Textarea } from "@sdh-project-services/nucleus-ui/dist/textarea";
import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Anchor } from "../../../components/anchor";
import { Context } from "../../../layouts/new-starter/context";
import { NewStarterMedicalFormData } from "./types";

export function Form(): React.ReactElement {
  const { submitStep, values } = useContext(Context);
  const { errors, handleSubmit, register } = useForm<NewStarterMedicalFormData>(
    { defaultValues: values }
  );
  const [medicalIssues, useMedicalIssues] = useState(false);
  const [medicationRequired, useMedicationRequired] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "medicalIssues") {
      useMedicalIssues(!medicalIssues);
    } else {
      useMedicationRequired(!medicationRequired);
    }
  };

  const handleFormSubmit = (data: NewStarterMedicalFormData) => {
    submitStep(7, data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Label
        label="Do you suffer from any medical issues or ailments?"
        name="issuesRadio"
        required
      />
      <div className="flex">
        <RadioButton
          checked={medicalIssues}
          label="Yes"
          name="medicalIssues"
          onChange={handleChange}
        />
        <div className="ml-4">
          <RadioButton
            checked={!medicalIssues}
            label="No"
            name="medicalIssues"
            onChange={handleChange}
          />
        </div>
      </div>
      {medicalIssues && (
        <Textarea
          className="mt-4"
          componentRef={register(
            medicalIssues
              ? {
                  required: "Please provide information of medical issues",
                }
              : {}
          )}
          error={errors.issues}
          name="issues"
          required
        />
      )}
      <div className="mt-8">
        <Label
          label="Do you take any medication that could impair your ability to work?"
          name="medicationRequired"
          required
        />
        <div className="flex">
          <RadioButton
            checked={medicationRequired}
            label="Yes"
            name="medicationRequired"
            onChange={handleChange}
          />
          <div className="ml-4">
            <RadioButton
              checked={!medicationRequired}
              label="No"
              name="medicationRadio"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      {medicationRequired && (
        <Textarea
          className="mt-4"
          componentRef={register(
            medicationRequired
              ? {
                  required:
                    "Please provide information of medication requirements",
                }
              : {}
          )}
          error={errors.medication}
          name="medication"
          required
        />
      )}
      <div className="flex justify-between mt-8">
        <Anchor href="/new-starter/my-photo">
          <Button>Back</Button>
        </Anchor>
        <PrimaryButton>Continue</PrimaryButton>
      </div>
    </form>
  );
}
