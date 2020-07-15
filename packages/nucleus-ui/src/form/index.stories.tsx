import { action } from "@storybook/addon-actions";
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../button";
import { Input } from "../input";

export default {
  title: "form",
};

type Inputs = {
  firstName: string;
  lastName: string;
};

const onSubmit = (data: any) => {
  action("submit", data)(data);
};

export const basicForm = () => {
  const { register, handleSubmit, errors } = useForm<Inputs>();

  return (
    <div className="flex  justify-center">
      <form
        className="flex flex-col justify-center w-1/2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          componentRef={register({ required: "Firstname is required" })}
          error={errors.firstName}
          label="FirstName"
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
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};
