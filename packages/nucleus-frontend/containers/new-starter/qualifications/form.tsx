import {
  PrimaryButton,
  Button,
} from "@sdh-project-services/nucleus-ui/dist/button";
import { Label } from "@sdh-project-services/nucleus-ui/dist/label";
import { Select } from "@sdh-project-services/nucleus-ui/dist/select";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { Anchor } from "../../../components/anchor";
import { Context } from "../../../layouts/new-starter/context";
import { Qualification } from "./qualification";

const qualifications = [{ label: "CPCS Blue", value: "xxx" }];

export function Form(): React.ReactElement {
  const { submitStep, values } = useContext(Context);
  const { handleSubmit } = useForm({ defaultValues: values });

  const handleFormSubmit = () => {
    submitStep(4, {});
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
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
  );
}
