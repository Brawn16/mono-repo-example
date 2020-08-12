import {
  PrimaryButton,
  Button,
} from "@sdh-project-services/nucleus-ui/dist/button";
import { Fieldset } from "@sdh-project-services/nucleus-ui/dist/fieldset";
import { Select } from "@sdh-project-services/nucleus-ui/dist/select";
import Router from "next/router";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Anchor } from "../../../components/anchor";
import { Head } from "../../../components/head";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";
import { Context } from "../../../layouts/new-starter/context";
import { rightToWorkIds, secondaryIds } from "./option-values";
import { NewStarterIdentificationFormData } from "./types";
import { Uploader } from "./uploader";

export function Form(): React.ReactElement {
  const { submitStep, values } = useContext(Context);
  const {
    errors,
    handleSubmit,
    register,
    watch,
    setValue,
    getValues,
  } = useForm<NewStarterIdentificationFormData>({ defaultValues: values });

  useEffect(() => {
    register(
      { name: "identification[0].photos" },
      {
        validate: (value) =>
          value === undefined || value.length === 0
            ? "Identification is required"
            : true,
      }
    );
    register(
      { name: "identification[1].photos" },
      {
        validate: (value) =>
          value === undefined || value.length === 0
            ? "Identification is required"
            : true,
      }
    );
  }, []);

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleUploadChange = (fileIds: string[], valueName: string) => {
    setValue(valueName, fileIds);
  };

  const handleSubmitChange = (data: any) => {
    /* eslint-disable-next-line no-console */

    submitStep(2, data);
    Router.push("/new-starter/my-photo");
  };

  const watchIdentificationOne = watch("identification[0].type");
  const watchIdentificationTwo = watch("identification[1].type");

  return (
    <>
      <Head title="Identification - New Starter Form" />
      <NewStarterLayout>
        <div className="pl-4 my-8">
          <ul className="list-disc">
            To prove you have the right to work in the UK, please provide a
            Valid (must be in date) copy of one of the following:
            <ul className="pl-4 mt-2 mb-4 list-disc">
              <li>UK/EEA Passport </li>
              <li>UK/EEA National identity card</li>
              <li>Non-UK passport (Photo page and Work permit Page)</li>
              <li>Biometric Residence Permit (with right to work)</li>
              <li>
                UK Birth Certificate with Photo ID (3) (Passport sized photo
                that is countersigned on the back by someone who can confirm
                your identity)
              </li>
            </ul>
            To confirm your address, please submit one of the following:
            <ul className="pl-4 mt-2 mb-4 list-disc">
              <li>
                Bank statement no more than 3 months old (relevant Address
                showing date page)
              </li>
              <li>
                {" "}
                HMRC letter no more than 12 months old (relevant Address showing
                date page)
              </li>
              <li>
                Utility bill no more than 3 months old (relevant Address showing
                date page)
              </li>
              <li>
                UK Driving License (please upload both front and back of card)
              </li>
            </ul>
          </ul>
        </div>
        <form onSubmit={handleSubmit(handleSubmitChange)}>
          <div className="py-4">
            <Fieldset>
              <Select
                className="w-full"
                componentRef={register({
                  required: "This field is required",
                })}
                error={
                  errors.identification &&
                  errors.identification[0] &&
                  errors.identification[0].type
                }
                name="identification[0].type"
                options={rightToWorkIds}
              />
              {watchIdentificationOne && (
                <Uploader
                  error={
                    errors.identification &&
                    errors.identification[0] &&
                    errors.identification[0].photos
                  }
                  getValues={getValues}
                  label="passport or identification"
                  multiple
                  name="identification[0].photos"
                  onChange={handleUploadChange}
                  tags={["identification", "public"]}
                  watch={watch}
                />
              )}
            </Fieldset>
          </div>
          <div>
            <Fieldset>
              <Select
                className="w-full"
                componentRef={register({
                  required: "This field is required",
                })}
                error={
                  errors.identification &&
                  errors.identification[1] &&
                  errors.identification[1].type
                }
                name="identification[1].type"
                options={secondaryIds}
              />
              {watchIdentificationTwo && (
                <Uploader
                  error={
                    errors.identification &&
                    errors.identification[1] &&
                    errors.identification[1].photos
                  }
                  getValues={getValues}
                  label="Proof of Address"
                  multiple
                  name="identification[1].photos"
                  onChange={handleUploadChange}
                  tags={["identification", "public"]}
                  watch={watch}
                />
              )}
            </Fieldset>
          </div>
          <div className="flex justify-between mx-8 mt-8 md:mx-0">
            <Anchor href="/new-starter/qualifications">
              <Button>Back</Button>
            </Anchor>
            <PrimaryButton>Continue</PrimaryButton>
          </div>
        </form>
      </NewStarterLayout>
    </>
  );
}
