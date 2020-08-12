import {
  PrimaryButton,
  Button
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
    getValues
  } = useForm<NewStarterIdentificationFormData>({ defaultValues: values });
  const watchIdentificationOne = watch("identification[0].type");
  const watchIdentificationTwo = watch("identification[1].type");
  watch(["identification[0].photos"]);
  watch(["identification[1].photos"]);

  useEffect(() => {
    register({ name: "identification[0].photos" }, { validate });
    register({ name: "identification[1].photos" }, { validate });
  }, []);

  const handleChange = (name: string, value: string[]) => {
    setValue(name, value);
  };

  const handleFormSubmit = (data: NewStarterIdentificationFormData) => {
    submitStep(3, data);
    Router.push("/new-starter/work-details");
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="py-4">
        <Fieldset>
          <Select
            className="w-full"
            componentRef={register({
              required: "This field is required"
            })}
            error={
              errors.identification &&
              errors.identification[0] &&
              errors.identification[0].type
            }
            name="identification[0].type"
            options={rightToworkOptions}
          />
          {watchIdentificationOne && (
            <Uploader
              error={
                errors.identification &&
                errors.identification[0] &&
                (errors.identification[0].photos as any)
              }
              name="identification[0].photos"
              onChange={handleChange}
              values={getValues("identification[0].photos")}
            />
          )}
        </Fieldset>
      </div>
      <div>
        <Fieldset>
          <Select
            className="w-full"
            componentRef={register({
              required: "This field is required"
            })}
            error={
              errors.identification &&
              errors.identification[1] &&
              errors.identification[1].type
            }
            name="identification[1].type"
            options={proofOfAddressOptions}
          />
          {watchIdentificationTwo && (
            <Uploader
              error={
                errors.identification &&
                errors.identification[1] &&
                errors.identification[1].photos &&
                (errors.identification[1].photos as any)
              }
              name="identification[1].photos"
              onChange={handleChange}
              values={getValues("identification[1].photos")}
            />
          )}
        </Fieldset>
      </div>
      <div className="flex justify-between mx-8 mt-8 md:mx-0">
        <Anchor href="/new-starter/address">
          <Button>Back</Button>
        </Anchor>
        <PrimaryButton>Continue</PrimaryButton>
      </div>
    </form>
  );
}
