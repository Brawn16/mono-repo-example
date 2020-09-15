import { InputHelp } from "@sdh-project-services/nucleus-ui/dist/input-help";
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
        accept="image/gif,image/jpeg,image/png"
        error={errors.qualificationUploadIds as any}
        fileLabel="photo"
        multiple
        onChange={handleChange}
        tags={["operativeQualification", "public"]}
        uploads={qualificationUploadIds}
      >
        <div className="mt-4">
          <InputHelp help="All uploads must be from a UK recognised competent authority/professional body/licensed body." />
          <InputHelp help="Make sure to upload the front and back of any qualification cards." />
        </div>

        <UploadGallery />
      </UploadDropzone>
      <Navigation />
    </form>
  );
}
