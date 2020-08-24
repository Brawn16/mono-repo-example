import { useQuery } from "@apollo/client";
import {
  PrimaryButton,
  SecondaryButton,
} from "@sdh-project-services/nucleus-ui/dist/button";
import { RadioButton } from "@sdh-project-services/nucleus-ui/dist/radio-button";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Anchor } from "../../../components/anchor";
import { Context } from "../../../layouts/new-starter/context";
import { imageData } from "./images";
import {
  subcontractors as subcontractorsQuery,
  workstreams as workstreamsQuery,
} from "./queries.gql";
import { NewStarterWorkDetailsFormData, WorkStreamProps } from "./types";

function getOptions(data: any) {
  if (data === undefined) {
    return [];
  }

  return data.map(({ id, name }: any) => ({
    label: name,
    value: id,
  }));
}

export function Form(): React.ReactElement {
  const { submitStep, values } = useContext(Context);
  const { data: subcontractorsData }: any = useQuery(subcontractorsQuery);
  const { data: workstreamsData }: any = useQuery(workstreamsQuery);
  const {
    register,
    handleSubmit,
    errors,
    setValue,
    getValues,
    watch,
    clearErrors,
  } = useForm<NewStarterWorkDetailsFormData>({ defaultValues: values });

  const handleOnChange = (name: any, value: any) => {
    clearErrors(name);
    setValue(name, value);
  };

  useEffect(() => {
    register({ name: "subcontractor" }, { required: true });
    register({ name: "workstream" }, { required: true });
  }, []);

  const handleFormSubmit = (data: NewStarterWorkDetailsFormData) => {
    submitStep(4, data);
  };

  const { workstream, subcontractor } = getValues();
  watch("subcontractor");
  watch("workstream");

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="max-w-2xl">
        <p className="my-4 ml-2 font-semibold">Who will you be working for?</p>
        <div>
          {errors.workstream && (
            <p className="mb-2 ml-2 text-red-600">please select a option *</p>
          )}
        </div>
        <div className="flex">
          <input className="hidden" name="workstream" />
          {workstreamsData && (
            <>
              {getOptions(workstreamsData.workstreams).map(
                (item: WorkStreamProps) => {
                  const activeWorkstream =
                    workstream === item.value ? "border-gray-700" : "";
                  return (
                    <div
                      key={item.value}
                      aria-hidden
                      className="flex w-1/4 px-2 "
                      onClick={() => {
                        handleOnChange("workstream", item.value);
                      }}
                      role="button"
                    >
                      <div
                        className={`flex flex-col justify-center border rounded ${activeWorkstream}`}
                      >
                        <img
                          alt="workstream logo"
                          className="bg-no-repeat"
                          src={imageData[item.label]}
                        />
                      </div>
                    </div>
                  );
                }
              )}
              <div
                key={"don't know"}
                aria-hidden
                className="flex justify-between w-1/4 px-2 align-center"
                onClick={() => {
                  handleOnChange("workstream", undefined);
                }}
                role="button"
              >
                <div
                  className={`flex flex-col justify-center w-full text-center border rounded ${
                    workstream === "don't know" ? "border-gray-700" : ""
                  }`}
                >
                  <p className="text-middle">Do not know</p>
                </div>
              </div>
            </>
          )}
        </div>

        {subcontractorsData && (
          <div className="py-6">
            <p className="my-4 font-semibold">
              Which subcontractor are you working for?
            </p>
            <div>
              {errors.subcontractor && (
                <p className="text-red-600">please select a option *</p>
              )}
            </div>
            {getOptions(subcontractorsData.subcontractors).map((item: any) => {
              return (
                <div key={item.label} className="my-2">
                  <RadioButton
                    checked={subcontractor === item.value}
                    label={item.label}
                    name="subcontractor"
                    onChange={() => {
                      handleOnChange("subcontractor", item.value);
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="flex justify-between max-w-2xl mt-8">
        <Anchor href="/new-starter/identification">
          <div className="hidden md:block">
            <SecondaryButton>Previous</SecondaryButton>
          </div>
        </Anchor>
        <PrimaryButton className="w-full md:w-auto">Next</PrimaryButton>
      </div>
    </form>
  );
}
