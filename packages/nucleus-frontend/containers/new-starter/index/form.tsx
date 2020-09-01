/* eslint-disable unicorn/consistent-function-scoping */
import { PrimaryButton } from "@sdh-project-services/nucleus-ui/dist/button";
import { Checkbox } from "@sdh-project-services/nucleus-ui/dist/checkbox";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Anchor } from "../../../components/anchor";
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
          ? "Confirmation required to continue"
          : true,
    }
  );

  register(
    { name: "acceptedTermsConsent" },
    {
      validate: (value: boolean) =>
        value === undefined || value === false
          ? "Confirmation required to continue"
          : true,
    }
  );

  const handleChange = (
    name: "acceptedRequiredDocs" | "acceptedTermsConsent",
    value: boolean
  ) => {
    clearErrors(name);
    setValue(name, value);
  };

  const handleFormSubmit = (data: any) => {
    submitStep(0, data);
  };

  const acceptedRequiredDocumentationWatch = getValues("acceptedRequiredDocs");
  const acceptedTermsConsentWatch = watch("acceptedTermsConsent");

  return (
    <>
      <form className="max-w-2xl" onSubmit={handleSubmit(handleFormSubmit)}>
        <Checkbox
          checked={acceptedRequiredDocumentationWatch}
          className="my-2"
          error={errors.acceptedRequiredDocs}
          label="Yes, I have all the required documents to hand and would like to proceed."
          name="acceptedRequiredDocs"
          onChange={() => {
            handleChange(
              "acceptedRequiredDocs",
              acceptedRequiredDocumentationWatch === false
            );
          }}
        />
        <Checkbox
          checked={acceptedTermsConsentWatch}
          className="my-2 text-align-l"
          error={errors.acceptedTermsConsent}
          label={
            <>
              To proceed please confirm that you have read, consent and agree to
              our <Anchor href="">full terms</Anchor> and{" "}
              <Anchor href="">privacy policy</Anchor>, and understand that you
              can change communication and privacy preferences at request.
            </>
          }
          name="terms"
          onChange={() => {
            handleChange(
              "acceptedTermsConsent",
              acceptedTermsConsentWatch === false
            );
          }}
        />
        <div className="mt-8 text-right">
          <PrimaryButton className="w-full md:w-auto">Next</PrimaryButton>
        </div>
      </form>
    </>
  );
}
