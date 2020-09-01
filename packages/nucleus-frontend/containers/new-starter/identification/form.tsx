import {
  SecondaryButton,
  PrimaryButton,
} from "@sdh-project-services/nucleus-ui/dist/button";
import { Select } from "@sdh-project-services/nucleus-ui/dist/select";
import Router from "next/router";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Anchor } from "../../../components/anchor";
import { Context } from "../../../layouts/new-starter/context";
import { rightToworkOptions, proofOfAddressOptions } from "./options";
import { NewStarterIdentificationFormData } from "./types";
import { Uploader } from "./uploader";

function validate(value?: string[]) {
  if (value === undefined || value.length === 0) {
    return "Identification is required";
  }

  return true;
}

export function Form(): React.ReactElement {
  const { submitStep, values } = useContext(Context);
  const {
    errors,
    handleSubmit,
    register,
    watch,
    setValue,
    getValues,
    clearErrors,
  } = useForm<NewStarterIdentificationFormData>({ defaultValues: values });

  register({ name: "identifications[0].uploads" }, { validate });
  register({ name: "identifications[1].uploads" }, { validate });
  watch([
    "identifications[0].type",
    "identifications[0].uploads",
    "identifications[1].type",
    "identifications[1].uploads",
  ]);

  const identificationOneType = getValues("identifications[0].type");
  const identificationOneUploads: string[] = getValues(
    "identifications[0].uploads"
  );
  const identificationTwoType = getValues("identifications[1].type");
  const identificationTwoUploads: string[] = getValues(
    "identifications[1].uploads"
  );

  const handleChange = (name: string, value: string[]) => {
    clearErrors(name);
    setValue(name, value);
  };

  const handleFormSubmit = (data: NewStarterIdentificationFormData) => {
    submitStep(3, data);
    Router.push("/new-starter/work-details");
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Select
        className="mt-4"
        componentRef={register({
          required: "This field is required",
        })}
        error={
          errors.identifications &&
          errors.identifications[0] &&
          errors.identifications[0].type
        }
        label="Right to Work Document"
        name="identifications[0].type"
        options={rightToworkOptions}
      />
      {identificationOneType && (
        <Uploader
          error={
            errors.identifications &&
            errors.identifications[0] &&
            (errors.identifications[0].uploads as any)
          }
          name="identifications[0].uploads"
          onChange={handleChange}
          values={identificationOneUploads}
        />
      )}
      <Select
        className="mt-4"
        componentRef={register({
          required: "This field is required",
        })}
        error={
          errors.identifications &&
          errors.identifications[1] &&
          errors.identifications[1].type
        }
        label="Address Confirmation Document"
        name="identifications[1].type"
        options={proofOfAddressOptions}
      />
      {identificationTwoType && (
        <Uploader
          error={
            errors.identifications &&
            errors.identifications[1] &&
            errors.identifications[1].uploads &&
            (errors.identifications[1].uploads as any)
          }
          name="identifications[1].uploads"
          onChange={handleChange}
          values={identificationTwoUploads}
        />
      )}
      <div className="flex justify-between max-w-2xl mt-8">
        <Anchor href="/new-starter/personal-details">
          <div className="hidden md:block">
            <SecondaryButton>Previous</SecondaryButton>
          </div>
        </Anchor>
        <PrimaryButton className="w-full md:w-auto">Next</PrimaryButton>
      </div>
    </form>
  );
}
