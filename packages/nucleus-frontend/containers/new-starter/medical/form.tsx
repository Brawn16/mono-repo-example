import { InputError } from "@sdh-project-services/nucleus-ui/dist/input-error";
import { Label } from "@sdh-project-services/nucleus-ui/dist/label";
import { RadioButton } from "@sdh-project-services/nucleus-ui/dist/radio-button";
import { Textarea } from "@sdh-project-services/nucleus-ui/dist/textarea";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../../layouts/new-starter/context";
import { Navigation } from "../../../layouts/new-starter/navigation";
import { NewStarterMedicalFormData } from "./types";

function validate(value?: string) {
  if (value === undefined) {
    return "Please select an option";
  }

  return true;
}

export function Form() {
  const { submitStep, values } = useContext(Context);
  const {
    errors,
    getValues,
    clearErrors,
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<NewStarterMedicalFormData>({ defaultValues: values });

  register({ name: "medicalIssues" }, { validate });
  register({ name: "medicationRequired" }, { validate });

  watch(["medicalIssues", "medicationRequired"]);

  const { medicalIssues, medicationRequired } = getValues();

  const handleChange = (
    name: keyof NewStarterMedicalFormData,
    value: boolean
  ) => {
    setValue(name, value);
    clearErrors(name);
  };

  const handleFormSubmit = (data: NewStarterMedicalFormData) => {
    submitStep(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Label
        label="Do you suffer from any medical issues or ailments?"
        name="medicalIssues"
        required
      />
      <div className="flex space-x-4">
        <RadioButton
          checked={medicalIssues === true}
          label="Yes"
          name="medicalIssues"
          onChange={() => handleChange("medicalIssues", true)}
        />
        <RadioButton
          checked={medicalIssues === false}
          label="No"
          name="medicalIssues"
          onChange={() => handleChange("medicalIssues", false)}
        />
      </div>
      {errors.medicalIssues && <InputError error={errors.medicalIssues} />}
      {medicalIssues && (
        <Textarea
          className="mt-4"
          componentRef={register({
            required: "Please provide details of medical issues",
          })}
          error={errors.medicalIssuesNotes}
          label="Please provide more details"
          name="medicalIssuesNotes"
          required
        />
      )}
      <div className="mt-8">
        <Label
          label="Do you take any medication that could impair your ability to work?"
          name="medicationRequired"
          required
        />
        <div className="flex space-x-4">
          <RadioButton
            checked={medicationRequired === true}
            label="Yes"
            name="medicationRequired"
            onChange={() => handleChange("medicationRequired", true)}
          />
          <RadioButton
            checked={medicationRequired === false}
            label="No"
            name="medicationRequired"
            onChange={() => handleChange("medicationRequired", false)}
          />
        </div>
        {errors.medicationRequired && (
          <InputError error={errors.medicationRequired} />
        )}
      </div>
      {medicationRequired && (
        <Textarea
          className="mt-4"
          componentRef={register({
            required: "Please provide details of medication requirements",
          })}
          error={errors.medicationRequiredNotes}
          label="Please provide more details"
          name="medicationRequiredNotes"
          required
        />
      )}
      <Navigation />
    </form>
  );
}
