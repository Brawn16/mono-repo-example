import {
  PrimaryButton,
  Button,
} from "@sdh-project-services/nucleus-ui/dist/button";
import { Upload } from "@sdh-project-services/nucleus-ui/dist/upload";
import { UploadViewer } from "@sdh-project-services/nucleus-ui/dist/upload-viewer";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Anchor } from "../../../components/anchor";
import { Context } from "../../../layouts/new-starter/context";
import { NewStarterMyPhotoFormData } from "./types";

export function Form(): React.ReactElement {
  const { submitStep, values } = useContext(Context);
  const {
    errors,
    getValues,
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<NewStarterMyPhotoFormData>({ defaultValues: values });
  const watchPhotoId = watch("photoId");
  const { photoId } = getValues();

  useEffect(() => {
    register({ name: "photoId" }, { required: "Photo is required" });
  }, []);

  const handleChange = ([id]: string[]) => {
    setValue("photoId", id);
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
          error={errors.photoId}
          label="Upload Photo"
          onChange={handleChange}
          tags={["profile-pic", "public"]}
        />
        {watchPhotoId && (
          <UploadViewer id={photoId}>
            {({ url }) => (
              <img alt="Profile" className="block max-w-xs" src={url} />
            )}
          </UploadViewer>
        )}
      </div>
      <div className="flex justify-between mt-8">
        <Anchor href="/new-starter/identification">
          <Button>Back</Button>
        </Anchor>
        <PrimaryButton>Continue</PrimaryButton>
      </div>
    </form>
  );
}
