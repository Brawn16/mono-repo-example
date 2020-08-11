import { useQuery } from "@apollo/client";
import {
  PrimaryButton,
  Button,
} from "@sdh-project-services/nucleus-ui/dist/button";
import { Select } from "@sdh-project-services/nucleus-ui/dist/select";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Anchor } from "../../../components/anchor";
import { Context } from "../../../layouts/new-starter/context";
import {
  subcontractors as subcontractorsQuery,
  workstreams as workstreamsQuery,
} from "./queries.gql";
import { NewStarterWorkDetailsFormData } from "./types";

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
  const { data: subcontractorsData = {} }: any = useQuery(subcontractorsQuery);
  const { data: workstreamsData = {} }: any = useQuery(workstreamsQuery);
  const { register, handleSubmit, errors } = useForm<
    NewStarterWorkDetailsFormData
  >({ defaultValues: values });

  const handleFormSubmit = (data: NewStarterWorkDetailsFormData) => {
    submitStep(3, data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Select
        componentRef={register({
          required: "Workstream is required",
        })}
        error={errors.workstream}
        label="Workstream"
        name="workstream"
        options={getOptions(workstreamsData.workstreams)}
        required
      />
      <Select
        className="mt-4"
        componentRef={register({
          required: "Subcontractor is required",
        })}
        error={errors.subcontractor}
        label="Subcontractor"
        name="subcontractor"
        options={getOptions(subcontractorsData.subcontractors)}
        required
      />
      <div className="flex justify-between mx-8 mt-8 md:mx-0">
        <Anchor href="/new-starter/address">
          <Button>Back</Button>
        </Anchor>
        <PrimaryButton>Continue</PrimaryButton>
      </div>
    </form>
  );
}
