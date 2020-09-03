import { Upload } from "@sdh-project-services/nucleus-ui/dist/upload";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../../layouts/new-starter/context";
import { Navigation } from "../../../layouts/new-starter/navigation";
import { NewStarterMyPhotoFormData } from "./types";

export function Form() {
  const { submitStep, values } = useContext(Context);
  const {
    errors,
    getValues,
    handleSubmit,
    register,
    setValue,
    watch,
    clearErrors,
  } = useForm<NewStarterMyPhotoFormData>({ defaultValues: values });

  register({ name: "photoUpload" }, { required: "Photo is required" });
  watch("photoUpload");

  const { photoUpload } = getValues();

  const handleChange = ([id]: string[]) => {
    clearErrors("photoUpload");
    setValue("photoUpload", id);
  };

  const handleFormSubmit = (data: NewStarterMyPhotoFormData) => {
    submitStep(6, data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="mt-8">
        <Upload
          accept="image/*"
          buttonEntity="photo"
          error={errors.photoUpload}
          label="Upload Photo"
          onChange={handleChange}
          tags={["operativePhoto", "public"]}
          values={photoUpload ? [photoUpload] : undefined}
        />
      </div>
      <Navigation />
    </form>
  );
}
