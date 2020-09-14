import { useQuery } from "@apollo/client";
import { InputError } from "@sdh-project-services/nucleus-ui/dist/input-error";
import { Label } from "@sdh-project-services/nucleus-ui/dist/label";
import { RadioButton } from "@sdh-project-services/nucleus-ui/dist/radio-button";
import { Spinner } from "@sdh-project-services/nucleus-ui/dist/spinner";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../../layouts/new-starter/context";
import { Navigation } from "../../../layouts/new-starter/navigation";
import { logos } from "./logos";
import {
  subcontractors as subcontractorsQuery,
  workstreams as workstreamsQuery,
} from "./queries.gql";
import {
  NewStarterWorkDetailsFormData,
  WorkStreamDataItem,
  SubcontractorDataItem,
} from "./types";

function getOptions(data: any) {
  if (data === undefined) {
    return [];
  }

  return data.map(({ id, name }: any) => ({
    label: name,
    value: id,
  }));
}

function renderSubcontractors(
  subcontractorData: SubcontractorDataItem[],
  subcontractor: string | null,
  handleChange: (
    name: "workstream" | "subcontractor",
    value: string | null
  ) => void
) {
  return getOptions(subcontractorData).map(
    ({ label, value }: SubcontractorDataItem) => {
      return (
        <RadioButton
          key={value}
          checked={subcontractor === value}
          label={label}
          name="subcontractor"
          onChange={() => handleChange("subcontractor", value)}
        />
      );
    }
  );
}

function renderWorkstreams(
  workstreamsData: WorkStreamDataItem[],
  workstream: string | null,
  handleChange: (
    name: "workstream" | "subcontractor",
    value: string | null
  ) => void
) {
  return getOptions(workstreamsData).map(
    ({ label, value }: WorkStreamDataItem) => {
      const activeWorkstream = workstream === value ? "border-blue-600" : "";

      return (
        <button
          key={value}
          className={`flex flex-col items-center justify-center  md:w-full p-4 border-2 rounded focus:outline-none ${activeWorkstream}`}
          onClick={() => handleChange("workstream", value)}
          type="button"
        >
          <img alt={label} src={logos[label]} />
        </button>
      );
    }
  );
}

function validate(value?: string) {
  return value !== undefined;
}

export function Form() {
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

  register({ name: "workstream" }, { validate });
  register({ name: "subcontractor" }, { validate });

  const { workstream, subcontractor } = getValues();
  const activeWorkstream = workstream === null ? "border-blue-600" : "";

  const handleChange = (
    name: "workstream" | "subcontractor",
    value: string | null
  ) => {
    clearErrors(name);
    setValue(name, value);
  };

  const handleFormSubmit = (data: NewStarterWorkDetailsFormData) => {
    submitStep(data);
  };

  watch("subcontractor");
  watch("workstream");

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Label label="Who will you be working for?" />
      {workstreamsData === undefined && <Spinner />}
      {workstreamsData && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {renderWorkstreams(
            workstreamsData.workstreams,
            workstream,
            handleChange
          )}
          <button
            className={`flex flex-col items-center justify-center w-full p-4 border-2 rounded focus:outline-none ${activeWorkstream}`}
            onClick={() => handleChange("workstream", null)}
            type="button"
          >
            Don&apos;t know
          </button>
        </div>
      )}
      {errors.workstream && (
        <InputError
          error={{ message: "Please select an option", type: "manual" }}
        />
      )}
      <div className="mt-4">
        <Label label="Which subcontractor do you work for?" />
        {subcontractorsData === undefined && <Spinner />}
        {subcontractorsData && (
          <div className="space-y-2">
            {renderSubcontractors(
              subcontractorsData.subcontractors,
              subcontractor,
              handleChange
            )}
            <RadioButton
              checked={subcontractor === null}
              label="None"
              name="subcontractor"
              onChange={() => handleChange("subcontractor", null)}
            />
          </div>
        )}
        {errors.subcontractor && (
          <InputError
            error={{ message: "Please select an option", type: "manual" }}
          />
        )}
      </div>
      <Navigation />
    </form>
  );
}
