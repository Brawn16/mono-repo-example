/* eslint-disable unicorn/consistent-function-scoping */
import { PrimaryButton } from "@sdh-project-services/nucleus-ui/dist/button";
import { Checkbox } from "@sdh-project-services/nucleus-ui/dist/checkbox";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../../layouts/new-starter/context";
import { PreparationProps } from "./types";

export function Form(): React.ReactElement {
  const { submitStep, values } = useContext(Context);

  const {
    errors,
    handleSubmit,
    register,
    getValues,
    setValue,
    watch,
    clearErrors,
  } = useForm<PreparationProps>({
    defaultValues: values,
  });

  register(
    { name: "acceptedRequiredDocs" },
    {
      validate: (value: boolean) =>
        value === undefined || value === false
          ? "Confirmation required to continue."
          : true,
    }
  );

  register(
    { name: "acceptedTermsConsent" },
    {
      validate: (value: boolean) =>
        value === undefined || value === false
          ? "Confirmation required to continue."
          : true,
    }
  );

  const handleOnSubmit = (data: any) => {
    submitStep(0, data);
  };

  const onChange = (name: any, value: any) => {
    clearErrors(name);
    setValue(name, value);
  };

  const acceptedRequiredDocumentationWatch = getValues("acceptedRequiredDocs");
  const acceptedTermsConsentWatch = watch("acceptedTermsConsent");

  return (
    <>
      <form className="max-w-2xl" onSubmit={handleSubmit(handleOnSubmit)}>
        <Checkbox
          checked={acceptedRequiredDocumentationWatch}
          className="my-2"
          error={errors.acceptedRequiredDocs}
          label="Yes, I have the required documents to hand and would like to proceed"
          name="acceptedRequiredDocs"
          onChange={() => {
            onChange(
              "acceptedRequiredDocs",
              acceptedRequiredDocumentationWatch === false
            );
          }}
        />
        <div>
          <Checkbox
            checked={acceptedTermsConsentWatch}
            className="my-2 text-align-l"
            error={errors.acceptedTermsConsent}
            label="To proceed please confirm that you have read, consent and agree to our Full Terms and Privacy Policy"
            name="terms"
            onChange={() => {
              onChange(
                "acceptedTermsConsent",
                acceptedTermsConsentWatch === false
              );
            }}
          />
        </div>
        <PrimaryButton className="w-full mt-5 md:w-auto">Next</PrimaryButton>
      </form>
    </>
  );
}
