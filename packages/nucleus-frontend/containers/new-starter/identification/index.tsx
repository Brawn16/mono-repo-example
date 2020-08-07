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

export function Identification(): React.ReactElement {
  const { setFormData } = useContext<FormContext | any>(Context);
  const { errors, handleSubmit, setValue, register, getValues } = useForm<
    NewStarterIdentificationFormData
  >();

  useEffect(() => {
    setFormWithLocalStorage("identification", setValue);
    initiatePageToLocal("identification", setFormData);

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
    <>
      <Head title="Identification - New Starter Form" />
      <NewStarterLayout>
        <div className="pl-4 my-8">
          <ul className="list-disc">
            To prove you have the right to work in the UK, please provide a
            image of your Passport, National Identity Card or Biometric
            Residency Permit, and one of the following:
            <ul className="pl-4 mt-2 mb-4 list-disc">
              <li>Driving Licence</li>
              <li>Full Birth Certificate</li>
            </ul>
            If you do not have these, submit the following
            <ul className="pl-4 mt-2 mb-4 list-disc">
              <li>Bank statement no more than 3 months old</li>
              <li>HMRC letter no more than 12 months old</li>
              <li>Utility bill no more than 3 months old</li>
            </ul>
          </ul>
          * if providing Driving License upload both front and back of card
        </div>
        <form
          onSubmit={handleSubmit((data: any) => {
            /* eslint-disable-next-line no-console */
            const values = getValues();
            console.log(values, data);
            Router.push("/new-starter/my-photo");
          })}
        >
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
