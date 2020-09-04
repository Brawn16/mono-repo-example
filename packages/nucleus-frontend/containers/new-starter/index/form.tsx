import { PrimaryButton } from "@sdh-project-services/nucleus-ui/dist/button";
import { Checkbox } from "@sdh-project-services/nucleus-ui/dist/checkbox";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Anchor } from "../../../components/anchor";
import { Context } from "../../../layouts/new-starter/context";
import { NewStarterIndexFormData } from "./types";

function validate(value?: boolean) {
  if (value === undefined || value === false) {
    return "Confirmation required to continue";
  }

  return true;
}

export function Form() {
  const { submitStep, values } = useContext(Context);
  const {
    errors,
    handleSubmit,
    register,
    getValues,
    setValue,
    watch,
    clearErrors,
  } = useForm<NewStarterIndexFormData>({
    defaultValues: values,
  });

  register({ name: "acceptedRequiredDocs" }, { validate });
  register({ name: "acceptedTermsConsent" }, { validate });
  watch(["acceptedRequiredDocs", "acceptedTermsConsent"]);

  const { acceptedRequiredDocs, acceptedTermsConsent } = getValues();

  const handleChange = (
    name: "acceptedRequiredDocs" | "acceptedTermsConsent",
    value: boolean
  ) => {
    clearErrors(name);
    setValue(name, value);
  };

  const handleFormSubmit = (data: NewStarterIndexFormData) => {
    submitStep(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Checkbox
          checked={acceptedRequiredDocs === true}
          className="my-2"
          error={errors.acceptedRequiredDocs}
          label="Yes, I have all the required documents to hand and would like to proceed."
          name="acceptedRequiredDocs"
          onChange={() => {
            handleChange("acceptedRequiredDocs", acceptedRequiredDocs !== true);
          }}
        />
        <Checkbox
          checked={acceptedTermsConsent === true}
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
            handleChange("acceptedTermsConsent", acceptedTermsConsent !== true);
          }}
        />
        <div className="mt-8 text-right">
          <PrimaryButton className="w-full md:w-auto" type="submit">
            Next
          </PrimaryButton>
        </div>
      </form>
    </>
  );
}
