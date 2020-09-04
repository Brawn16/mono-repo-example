import { Select } from "@sdh-project-services/nucleus-ui/dist/select";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../../layouts/new-starter/context";
import { Navigation } from "../../../layouts/new-starter/navigation";
import { proofOfAddress, rightToWork } from "./options";
import { NewStarterIdentificationFormData } from "./types";
import { Upload } from "./upload";

function validate(value?: string[]) {
  if (value === undefined || value.length === 0) {
    return "Identification is required";
  }

  return true;
}

export function Form() {
  const { submitStep, values } = useContext(Context);
  const {
    clearErrors,
    errors,
    getValues,
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<NewStarterIdentificationFormData>({ defaultValues: values });
  const [idOneError, idTwoError] = errors.identifications || [];

  register({ name: "identifications[0].uploads" }, { validate });
  register({ name: "identifications[1].uploads" }, { validate });
  register(
    { name: "identifications[0].type" },
    { required: "Please select an ID type" }
  );
  register(
    { name: "identifications[1].type" },
    { required: "Please select a proof of address" }
  );

  watch(["identifications[0].type", "identifications[1].type"]);

  const idOneType: string = getValues("identifications[0].type");
  const idOneUploads: string[] = getValues("identifications[0].uploads");
  const idTwoType: string = getValues("identifications[1].type");
  const idTwoUploads: string[] = getValues("identifications[1].uploads");

  const handleChange = (name: string, value: string | string[]) => {
    clearErrors(name);
    setValue(name, value);
  };

  const handleFormSubmit = (data: NewStarterIdentificationFormData) => {
    submitStep(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Select
        error={idOneError && idOneError.type}
        label="Select an ID type to upload"
        name="identifications[0].type"
        onChange={({ target: { name, value } }) => handleChange(name, value)}
        options={rightToWork}
        value={idOneType}
      />
      {idOneType && (
        <Upload
          error={idOneError && (idOneError.uploads as any)}
          onChange={(uploads) =>
            handleChange("identifications[0].uploads", uploads)
          }
          options={rightToWork}
          type={idOneType}
          uploads={idOneUploads}
        />
      )}
      <Select
        className="mt-8"
        error={idTwoError && idTwoError.type}
        label="Select a proof of address to upload"
        name="identifications[1].type"
        onChange={({ target: { name, value } }) => handleChange(name, value)}
        options={proofOfAddress}
        value={idTwoType}
      />
      {idTwoType && (
        <Upload
          error={idTwoError && (idTwoError.uploads as any)}
          onChange={(uploads) =>
            handleChange("identifications[1].uploads", uploads)
          }
          options={proofOfAddress}
          type={idTwoType}
          uploads={idTwoUploads}
        />
      )}
      <Navigation />
    </form>
  );
}
