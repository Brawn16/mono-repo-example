import { useQuery } from "@apollo/client";
import { Select } from "@sdh-project-services/nucleus-ui/dist/select";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../../layouts/new-starter/context";
import { Navigation } from "../../../layouts/new-starter/navigation";
import { identifications as identificationsQuery } from "./queries.gql";
import { NewStarterIdentificationFormData } from "./types";
import { Uploads } from "./uploads";

function validate(uploads?: Array<string | undefined>) {
  if (
    uploads === undefined ||
    uploads.length === 0 ||
    uploads.includes(undefined)
  ) {
    return "Please provide all required photos";
  }

  return true;
}

export function Form() {
  const { data: types }: any = useQuery(identificationsQuery);
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
    { name: "identifications[0].identification" },
    { required: "Please select an ID type" }
  );
  register(
    { name: "identifications[1].identification" },
    { required: "Please select a proof of address" }
  );

  watch([
    "identifications[0].identification",
    "identifications[1].identification",
    "identifications[0].uploads",
    "identifications[1].uploads",
  ]);

  const idOneType: string = getValues("identifications[0].identification");
  const idTwoType: string = getValues("identifications[1].identification");
  const idOneUploads: string[] = getValues("identifications[0].uploads");
  const idTwoUploads: string[] = getValues("identifications[1].uploads");

  const getOptions = (dropdownType: string) => {
    return types.identifications
      .filter(({ type }: any) => type === dropdownType)
      .map(({ id, name }: any) => ({
        label: name,
        value: id,
      }));
  };

  const getUploadTypes = (identification: string) => {
    const type = types.identifications.find(
      ({ id }: any) => id === identification
    );

    return type === undefined ? [] : type.uploadTypes;
  };

  const handleFormSubmit = (data: NewStarterIdentificationFormData) => {
    submitStep(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {types && (
        <>
          <Select
            error={idOneError && idOneError.identification}
            label="Select an ID type to upload"
            name="identifications[0].identification"
            onChange={({ target: { name, value } }) => {
              setValue(name, value);
              clearErrors("identifications[0]");
              setValue("identifications[0].uploads", undefined);
            }}
            options={getOptions("id")}
            value={idOneType}
          />
          {idOneType && (
            <Uploads
              error={idOneError && (idOneError.uploads as any)}
              onChange={(uploads) => {
                setValue("identifications[0].uploads", uploads);
                clearErrors("identifications[0]");
              }}
              uploads={idOneUploads}
              uploadTypes={getUploadTypes(idOneType)}
            />
          )}
          <Select
            className="mt-8"
            error={idTwoError && idTwoError.identification}
            help="If you have a UK driving licence, please use this as your proof of address."
            label="Select a proof of address to upload"
            name="identifications[1].identification"
            onChange={({ target: { name, value } }) => {
              setValue(name, value);
              clearErrors("identifications[1]");
              setValue("identifications[1].uploads", undefined);
            }}
            options={getOptions("address")}
            value={idTwoType}
          />
          {idTwoType && (
            <Uploads
              error={idTwoError && (idTwoError.uploads as any)}
              onChange={(uploads) => {
                setValue("identifications[1].uploads", uploads);
                clearErrors("identifications[1]");
              }}
              uploads={idTwoUploads}
              uploadTypes={getUploadTypes(idTwoType)}
            />
          )}
        </>
      )}
      <Navigation />
    </form>
  );
}
