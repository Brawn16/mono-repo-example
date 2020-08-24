import { action } from "@storybook/addon-actions";
import React from "react";
import { useForm } from "react-hook-form";
import { PrimaryButton } from "../button";
import { Input } from "../input";
import { InputTypes } from "./types";

export default {
  title: "Form",
};

type Props = {
  onSubmit?: (data: object) => any;
};

export const Form = (props: Props) => {
  const { register, handleSubmit, errors } = useForm<InputTypes>();
  const { onSubmit = action("onSubmit") } = props;

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col justify-center w-1/2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          componentRef={register({ required: "Firstname is required" })}
          error={errors.firstName}
          label="Firstname"
          name="firstName"
        />
        <Input
          className="mt-4"
          componentRef={register({ required: "Lastname is required" })}
          error={errors.lastName}
          label="Lastname"
          name="lastName"
        />
        <div className="mt-8">
          <PrimaryButton>Submit</PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export const form = () => <Form />;
