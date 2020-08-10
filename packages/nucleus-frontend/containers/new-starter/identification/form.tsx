import {
  PrimaryButton,
  Button
} from "@sdh-project-services/nucleus-ui/dist/button";
import { Upload } from "@sdh-project-services/nucleus-ui/dist/upload";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Anchor } from "../../../components/anchor";
import { Context } from "../../../layouts/new-starter/context";
import { NewStarterIdentificationFormData } from "./types";

export function Form(): React.ReactElement {
  const { submitStep, values } = useContext(Context);
  const { errors, handleSubmit, setValue, register } = useForm<
    NewStarterIdentificationFormData
  >({ defaultValues: values });

  useEffect(() => {
    register(
      { name: "idOneUploadOne" },
      { required: "This Identication is required" }
    );
    register(
      { name: "idOneUploadTwo" },
      { required: "There must be two uploads for the this Identification" }
    );
    register(
      { name: "idTwo" },
      { required: "this Identification is required" }
    );
    register(
      { name: "idThree" },
      { required: "this Identification is required" }
    );
  }, []);

  const handleFormSubmit = (data: NewStarterIdentificationFormData) => {
    submitStep(5, data);
  };

  const handleUploadOneChange = (fileIds: string[]) => {
    setValue("idOneUploadOne", fileIds[0]);
    setValue("idOneUploadTwo", fileIds[1]);
  };
  const handleUploadTwoChange = (fileIds: string[]) => {
    setValue("idTwo", fileIds[0]);
  };
  const handleUploadThreeChange = (fileIds: string[]) => {
    setValue("idThree", fileIds[0]);
  };

  const uploadOneError =
    errors.idOneUploadTwo && errors.idOneUploadOne === undefined
      ? errors.idOneUploadTwo
      : errors.idOneUploadOne;

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="">
        <div className="p-4">
          <Upload
            error={uploadOneError}
            label="Passport or Identification"
            multiple
            onChange={handleUploadOneChange}
            tags={["identification"]}
          />
        </div>
        <div className="p-4">
          <Upload
            error={errors.idTwo}
            label="Upload second form of Identification"
            onChange={handleUploadTwoChange}
            tags={["identification"]}
          />
        </div>
        <div className="p-4">
          <Upload
            error={errors.idThree}
            label="Upload third form of identification"
            multiple
            onChange={handleUploadThreeChange}
            tags={["identification"]}
          />
        </div>
      </div>
      <div className="flex justify-between mx-8 mt-8 md:mx-0">
        <Anchor href="/new-starter/qualifications">
          <Button>Back</Button>
        </Anchor>
        <PrimaryButton>Continue</PrimaryButton>
      </div>
    </form>
  );
}
