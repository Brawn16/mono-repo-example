import {
  PrimaryButton,
  Button,
} from "@sdh-project-services/nucleus-ui/dist/button";
import { Upload } from "@sdh-project-services/nucleus-ui/dist/upload";
import React, { useContext, useEffect } from "react";
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
  const { qualificationPhotoIds } = getValues();

  useEffect(() => {
    register({ name: "qualificationPhotoIds" });
  }, []);

  const handleChange = (ids: string[]) => {
    setValue("qualificationPhotoIds", ids);
  };

  const handleFormSubmit = (data: NewStarterQualificationsFormData) => {
    submitStep(5, data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Upload
        accept="image/*"
        buttonEntity="photo"
        label="Upload Photos"
        multiple
        onChange={handleChange}
        tags={["qualification", "public"]}
        values={qualificationPhotoIds as string[]}
      />
      <div className="flex justify-between mt-8">
        <Anchor href="/new-starter/work-details">
          <Button>Back</Button>
        </Anchor>
        <PrimaryButton>Continue</PrimaryButton>
      </div>
    </form>
  );
}
