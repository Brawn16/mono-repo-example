import {
  PrimaryButton,
  Button,
} from "@sdh-project-services/nucleus-ui/dist/button";
import { Label } from "@sdh-project-services/nucleus-ui/dist/label";
import { RadioButton } from "@sdh-project-services/nucleus-ui/dist/radio-button";
import { Textarea } from "@sdh-project-services/nucleus-ui/dist/textarea";
import Router from "next/router";
import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Anchor } from "../../../components/anchor";
import { Head } from "../../../components/head";
import { FormContext, Context } from "../../../contexts/context";
import {
  setFormWithLocalStorage,
  initiatePageToLocal,
} from "../../../helpers/helper";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";
import { NewStarterMedicalFormData } from "./types";

export function Medical(): React.ReactElement {
  const { register, handleSubmit, errors, setValue } = useForm<
    NewStarterMedicalFormData
  >();
  const [medicalIssues, useMedicalIssues] = useState(false);
  const [medicationRequired, useMedicationRequired] = useState(false);

  const { setFormData } = useContext<FormContext | any>(Context);

  useEffect(() => {
    setFormWithLocalStorage("medical", setValue);
    initiatePageToLocal("medical", setFormData);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "medicalIssues") {
      useMedicalIssues(!medicalIssues);
    } else {
      useMedicationRequired(!medicationRequired);
    }
  };

  return (
    <>
      <Head title="Medical Questionnaire - New Starter Form" />
      <NewStarterLayout>
        <form
          onSubmit={handleSubmit((data) => {
            setFormData("personalDetails", data);
            Router.push("/new-starter/summary");
          })}
        >
          <Label
            label="Do you suffer from any medical issues or ailments?"
            name="issuesRadio"
            required
          />
          <div className="flex">
            <RadioButton
              checked={medicalIssues}
              label="Yes"
              name="medicalIssues"
              onChange={handleChange}
            />
            <div className="ml-4">
              <RadioButton
                checked={!medicalIssues}
                label="No"
                name="medicalIssues"
                onChange={handleChange}
              />
            </div>
          </div>
          {medicalIssues && (
            <Textarea
              className="mt-4"
              componentRef={register(
                medicalIssues
                  ? {
                      required: "Please provide information of medical issues",
                    }
                  : {}
              )}
              error={errors.issues}
              name="issues"
              required
            />
          )}
          <div className="mt-8">
            <Label
              label="Do you take any medication that could impair your ability to work?"
              name="medicationRequired"
              required
            />
            <div className="flex">
              <RadioButton
                checked={medicationRequired}
                label="Yes"
                name="medicationRequired"
                onChange={handleChange}
              />
              <div className="ml-4">
                <RadioButton
                  checked={!medicationRequired}
                  label="No"
                  name="medicationRadio"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          {medicationRequired && (
            <Textarea
              className="mt-4"
              componentRef={register(
                medicationRequired
                  ? {
                      required:
                        "Please provide information of medication requirements",
                    }
                  : {}
              )}
              error={errors.medication}
              name="medication"
              required
            />
          )}
          <div className="flex justify-between mx-8 mt-8 md:mx-0">
            <Anchor href="/new-starter/identification">
              <Button>Back</Button>
            </Anchor>
            <PrimaryButton>Continue</PrimaryButton>
          </div>
        </form>
      </NewStarterLayout>
    </>
  );
}
