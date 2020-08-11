import {
  PrimaryButton,
  Button
} from "@sdh-project-services/nucleus-ui/dist/button";
import { Select } from "@sdh-project-services/nucleus-ui/dist/select";
import Router from "next/router";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Anchor } from "../../../components/anchor";
import { Head } from "../../../components/head";
import { FormContext, Context } from "../../../contexts/context";
import {
  setFormWithLocalStorage,
  initiatePageToLocal
} from "../../../helpers/helper";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";
import { NewStarterWorkDetailsFormData } from "./types";

export function WorkDetails(): React.ReactElement {
  const { register, handleSubmit, setValue, errors } = useForm<
    NewStarterWorkDetailsFormData
  >();

  const { setFormData } = useContext<FormContext | any>(Context);

  useEffect(() => {
    setFormWithLocalStorage("workDetails", setValue);
    initiatePageToLocal("workDetails", setFormData);
  }, []);
  return (
    <>
      <Head title="Work Details - New Starter Form" />
      <NewStarterLayout>
        <form
          onSubmit={handleSubmit(data => {
            setFormData("workDetails", data);
            Router.push("/new-starter/qualifications");
          })}
        >
          <Select
            componentRef={register({
              required: "Workstream is required"
            })}
            error={errors.workstream}
            label="Workstream"
            name="workstream"
            options={[{ label: "City Fibre", value: "City Fibre" }]}
            required
          />
          <Select
            className="mt-4"
            componentRef={register({
              required: "Subcontractor is required"
            })}
            error={errors.subcontractor}
            label="Subcontractor"
            name="subcontractor"
            options={[{ label: "Terry's Telecom", value: "Terry's Telecom" }]}
            required
          />
          <div className="flex justify-between mx-8 mt-8 md:mx-0">
            <Anchor href="/new-starter/address">
              <Button>Back</Button>
            </Anchor>
            <PrimaryButton>Continue</PrimaryButton>
          </div>
        </form>
      </NewStarterLayout>
    </>
  );
}
