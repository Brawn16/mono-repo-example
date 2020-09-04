import { UploadDropzone } from "@sdh-project-services/nucleus-ui/dist/upload-dropzone";
import { UploadGallery } from "@sdh-project-services/nucleus-ui/dist/upload-gallery";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../../layouts/new-starter/context";
import { Navigation } from "../../../layouts/new-starter/navigation";
import { NewStarterQualificationsFormData } from "./types";

export function Form() {
  const { submitStep, values } = useContext(Context);
  const { errors, getValues, handleSubmit, register, setValue } = useForm<
    NewStarterQualificationsFormData
  >({
    defaultValues: values,
  });

  register({ name: "qualificationUploadIds" });

  const { qualificationUploadIds } = getValues();

  const handleChange = (uploads: string[]) => {
    setValue("qualificationUploadIds", uploads);
  };

  const handleFormSubmit = (data: NewStarterQualificationsFormData) => {
    submitStep(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <UploadDropzone
        accept="image/*"
        error={errors.qualificationUploadIds as any}
        multiple
        onChange={handleChange}
        tags={["operativeQualification", "public"]}
        uploads={qualificationUploadIds}
      >
        <UploadGallery />
      </UploadDropzone>
      <Navigation />
    </form>
  );
}
