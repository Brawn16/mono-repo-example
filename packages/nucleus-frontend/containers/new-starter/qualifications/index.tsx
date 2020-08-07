import {
  PrimaryButton,
  Button,
} from "@sdh-project-services/nucleus-ui/dist/button";
import { Label } from "@sdh-project-services/nucleus-ui/dist/label";
import { Select } from "@sdh-project-services/nucleus-ui/dist/select";
import Router from "next/router";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaAd, FaPlus } from "react-icons/fa";
import { Anchor } from "../../../components/anchor";
import { Head } from "../../../components/head";
import { Context } from "../../../contexts/context";
import {
  setFormWithLocalStorage,
  initiatePageToLocal,
} from "../../../helpers/helper";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";
import { Qualification } from "./qualification";

export function Qualifications(): React.ReactElement {
  const { handleSubmit, setValue } = useForm();
  const { setFormData } = useContext(Context);

  const qualifications = [{ label: "CPCS Blue", value: "xxx" }];

  useEffect(() => {
    setFormWithLocalStorage("qualifications", setValue);
    initiatePageToLocal("qualifications", setFormData);
  }, []);

  const handleSubmitCallback = (data: any) => {
    setFormData("qualifications", data);
    Router.push("/new-starter/identification");
  };

  return (
    <>
      <Head title="Qualifications - New Starter Form" />
      <NewStarterLayout>
        <form onSubmit={handleSubmit(handleSubmitCallback)}>
          <Qualification />
          <div className="flex-col mt-8">
            <Label label="Add Another Qualification" name="qualification" />
            <div className="flex">
              <Select
                className="w-full"
                name="qualification"
                options={qualifications}
              />
              <PrimaryButton>
                <FaPlus />
              </PrimaryButton>
            </div>
          </div>
          <div className="flex justify-between mx-8 mt-8 md:mx-0">
            <Anchor href="/new-starter/work-details">
              <Button>Back</Button>
            </Anchor>
            <PrimaryButton>Continue</PrimaryButton>
          </div>
        </form>
      </NewStarterLayout>
    </>
  );
}
