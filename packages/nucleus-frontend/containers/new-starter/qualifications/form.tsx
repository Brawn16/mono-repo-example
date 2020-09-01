import {
  PrimaryButton,
  SecondaryButton,
} from "@sdh-project-services/nucleus-ui/dist/button";
import { Upload } from "@sdh-project-services/nucleus-ui/dist/upload";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Anchor } from "../../../components/anchor";
import { Context } from "../../../layouts/new-starter/context";
import { NewStarterQualificationsFormData } from "./types";

export function Form(): React.ReactElement {
  const { submitStep, values } = useContext(Context);
  const { handleSubmit, getValues, register, setValue } = useForm<
    NewStarterQualificationsFormData
  >({
    defaultValues: values,
  });

  register({ name: "qualificationUploadIds" });

  const { qualificationUploadIds } = getValues();

  const handleChange = (ids: string[]) => {
    setValue("qualificationUploadIds", ids);
  };

  const handleFormSubmit = (data: NewStarterQualificationsFormData) => {
    submitStep(5, data);
  };

  return (
    <form className="max-w-2xl" onSubmit={handleSubmit(handleFormSubmit)}>
      <Upload
        accept="image/*"
        buttonEntity="photo"
        label="Upload Photos"
        multiple
        onChange={handleChange}
        tags={["operativeQualification", "public"]}
        values={qualificationUploadIds as string[]}
      />
      <div className="flex justify-between max-w-2xl mt-8">
        <Anchor href="/new-starter/work-details">
          <div className="hidden md:block">
            <SecondaryButton>Previous</SecondaryButton>
          </div>
        </Anchor>
        <PrimaryButton className="w-full md:w-auto">Next</PrimaryButton>
      </div>
    </form>
  );
}
