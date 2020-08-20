/* eslint-disable unicorn/consistent-function-scoping */
import { PrimaryButton } from "@sdh-project-services/nucleus-ui/dist/button";
import { Checkbox } from "@sdh-project-services/nucleus-ui/dist/checkbox";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../../layouts/new-starter/context";

export function Form(): React.ReactElement {
  const { submitStep, values } = useContext(Context);

  const { errors, handleSubmit, register, setValue, watch } = useForm<any>({
    defaultValues: values,
  });
  useEffect(() => {
    register(
      { name: "requiredDocs" },
      {
        validate: (value: boolean) =>
          value === undefined || value === false
            ? "Confirmation required to continue"
            : true,
      }
    );
    register(
      { name: "termsConsent" },
      {
        validate: (value: boolean) =>
          value === undefined || value === false
            ? "Confirmation required to continue"
            : true,
      }
    );
  }, []);

  const handleOnSubmit = (data: any) => {
    submitStep(0, data);
  };

  const onChange = (name: string, value: any) => {
    setValue(name, value);
  };

  const requiredDocumentationWatch = watch("requiredDocs");
  const termsConsentWatch = watch("termsConsent");
  return (
    <>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Checkbox
          checked={requiredDocumentationWatch}
          className="my-2"
          error={errors.requiredDocs}
          label="Yes, I have the required documents to hand and would like to proceed"
          name="requiredDocs"
          onChange={() => {
            onChange("requiredDocs", !requiredDocumentationWatch);
          }}
        />
        <div>
          <Checkbox
            checked={termsConsentWatch}
            className="my-2 text-align-l"
            error={errors.termsConsent}
            label="To proceed please confirm that you have read, consent and agree to our Full Terms and Privacy Policy"
            name="terms"
            onChange={() => {
              onChange("termsConsent", !termsConsentWatch);
            }}
          />
        </div>
        <PrimaryButton className="w-full mt-5">Continue</PrimaryButton>
      </form>
    </>
  );
}
