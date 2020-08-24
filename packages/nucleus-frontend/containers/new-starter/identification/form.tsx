import {
  PrimaryButton,
  SecondaryButton,
} from "@sdh-project-services/nucleus-ui/dist/button";
import { Fieldset } from "@sdh-project-services/nucleus-ui/dist/fieldset";
import { Select } from "@sdh-project-services/nucleus-ui/dist/select";
import Router from "next/router";
import React, { useContext, useEffect } from "react";
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

  useEffect(() => {
    register({ name: "identifications[0].uploads" }, { validate });
    register({ name: "identifications[1].uploads" }, { validate });
  }, []);

  const watchIdentificationsOne = watch("identifications[0].type");
  const watchIdentificationsTwo = watch("identifications[1].type");

  watch(["identifications[0].uploads"]);
  watch(["identifications[1].uploads"]);

  const handleChange = (name: string, value: string[]) => {
    clearErrors(name);
    setValue(name, value);
  };

  const handleFormSubmit = (data: NewStarterIdentificationFormData) => {
    submitStep(3, data);
    Router.push("/new-starter/work-details");
  };

  return (
    <form className="max-w-2xl" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="py-4">
        <Fieldset>
          <Select
            className="w-full"
            componentRef={register({
              required: "This field is required",
            })}
            error={
              errors.identifications &&
              errors.identifications[0] &&
              errors.identifications[0].type
            }
            name="identifications[0].type"
            options={rightToworkOptions}
          />
          {watchIdentificationsOne && (
            <Uploader
              error={
                errors.identifications &&
                errors.identifications[0] &&
                (errors.identifications[0].uploads as any)
              }
              name="identifications[0].uploads"
              onChange={handleChange}
              values={getValues("identification[0].uploads")}
            />
          )}
        </Fieldset>
      </div>
      <div>
        <Fieldset>
          <Select
            className="w-full"
            componentRef={register({
              required: "This field is required",
            })}
            error={
              errors.identifications &&
              errors.identifications[1] &&
              errors.identifications[1].type
            }
            name="identifications[1].type"
            options={proofOfAddressOptions}
          />
          {watchIdentificationsTwo && (
            <Uploader
              error={
                errors.identifications &&
                errors.identifications[1] &&
                errors.identifications[1].uploads &&
                (errors.identifications[1].uploads as any)
              }
              name="identifications[1].uploads"
              onChange={handleChange}
              values={getValues("identifications[1].uploads")}
            />
          )}
        </Fieldset>
      </div>
      <div className="flex justify-between  mt-8">
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
