import {
  PrimaryButton,
  Button,
} from "@sdh-project-services/nucleus-ui/dist/button";
import { Upload } from "@sdh-project-services/nucleus-ui/dist/upload";
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
import { NewStarterIdentificationFormData } from "./types";

const handleChange = (fileIds: string[]) => {
  /* eslint-disable-next-line no-console */
  console.log(fileIds);
};

export function Identification(): React.ReactElement {
  const { setFormData } = useContext<FormContext | any>(Context);
  const { errors, handleSubmit, setValue } = useForm<
    NewStarterIdentificationFormData
  >();

  useEffect(() => {
    setFormWithLocalStorage("identification", setValue);
    initiatePageToLocal("identification", setFormData);
  }, []);

  return (
    <>
      <Head title="Identification - New Starter Form" />
      <NewStarterLayout>
        <form
          onSubmit={handleSubmit((data) => {
            /* eslint-disable-next-line no-console */
            console.log("data", data);
            Router.push("/new-starter/my-photo");
          })}
        >
          <Upload
            error={errors.pictureId}
            label="Upload Passport"
            onChange={handleChange}
            tags={["identification"]}
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
