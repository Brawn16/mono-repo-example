import {
  PrimaryButton,
  Button,
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
  initiatePageToLocal,
} from "../../../helpers/helper";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";

export function Qualifications(): React.ReactElement {
  const { register, handleSubmit, setValue, errors } = useForm();

  const { setFormData } = useContext<FormContext | any>(Context);

  useEffect(() => {
    setFormWithLocalStorage("qualifications", setValue);
    initiatePageToLocal("qualifications", setFormData);
  }, []);
  return (
    <>
      <Head title="Qualifications - New Starter Form" />
      <NewStarterLayout>
        <form
          onSubmit={handleSubmit((data) => {
            setFormData("qualifications", data);
            Router.push("/new-starter/identification");
          })}
        >
          <Select
            componentRef={register({
              required: "Workstream is required",
            })}
            error={errors.workstream}
            label="qualification 1"
            name="qualification1"
            options={[{ label: "city fibre", value: "city fibre" }]}
            required
          />
          <Select
            className="mt-4"
            componentRef={register({
              required: "Subcontractor is required",
            })}
            error={errors.workstream}
            label="qualification 2"
            name="qualification2"
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
