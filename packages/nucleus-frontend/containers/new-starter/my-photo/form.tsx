import { UploadDropzone } from "@sdh-project-services/nucleus-ui/dist/upload-dropzone";
import { UploadGallery } from "@sdh-project-services/nucleus-ui/dist/upload-gallery";
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
    submitStep(data);
  };
  const uploadData = photoUpload ? [photoUpload] : undefined;
  return (
    <form className="mt-8" onSubmit={handleSubmit(handleFormSubmit)}>
      <UploadDropzone
        accept="image/gif,image/jpeg,image/x-png"
        error={errors.photoUpload as any}
        fileLabel="photo"
        onChange={handleChange}
        tags={["operativeQualification", "public"]}
        uploads={uploadData}
      >
        <UploadGallery />
      </UploadDropzone>
      <Navigation />
    </form>
  );
}
