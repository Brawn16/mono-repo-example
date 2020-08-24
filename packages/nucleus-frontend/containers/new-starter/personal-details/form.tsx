import {
  PrimaryButton,
  SecondaryButton,
} from "@sdh-project-services/nucleus-ui/dist/button";
import { Input } from "@sdh-project-services/nucleus-ui/dist/input";

import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Anchor } from "../../../components/anchor";
import { Context } from "../../../layouts/new-starter/context";
import { NewStarterPersonalDetailsFormData } from "./types";

export function Form(): React.ReactElement {
  const { submitStep, values } = useContext(Context);
  const { errors, handleSubmit, register, clearErrors } = useForm<
    NewStarterPersonalDetailsFormData
  >({ defaultValues: values });

  const handleFormSubmit = (data: NewStarterPersonalDetailsFormData) => {
    submitStep(1, data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Anchor className="flex mt-4 text-black" href="/new-starter">
        {`<`}
        <p className="underline">Back</p>
      </Anchor>

      <p className="mt-4 text-xl font-bold md:mt-8 md:text-3xl">Your details</p>
      <div className="max-w-2xl font-bold md:flex">
        <Input
          className="mt-4 md:mr-4 md:w-1/2"
          componentRef={register({
            required: "First name is required",
          })}
          error={errors.firstName}
          label="First Name"
          name="firstName"
          onKeyDown={() => {
            clearErrors("firstName");
          }}
          required
        />
        <Input
          className="mt-4 md:ml-4 md:w-1/2"
          componentRef={register({
            required: "Last name is required",
          })}
          error={errors.lastName}
          label="Last Name"
          name="lastName"
          onFocus={() => {
            clearErrors("lastName");
          }}
          required
        />
      </div>
      <div className="max-w-2xl font-bold">
        <Input
          className="mt-4 md:w-full"
          componentRef={register({
            required: "Phone number is required",
          })}
          error={errors.phoneNumber}
          inputMode="tel"
          label="Phone Number"
          name="phoneNumber"
          onFocus={() => {
            clearErrors("phoneNumber");
          }}
          positionIconLeft
          required
          type="tel"
        />
        <Input
          className="mt-4 md:w-full"
          componentRef={register({
            pattern: {
              message: "Invalid email address",
              value: /^[\w%+.-]+@[\d.a-z-]+\.[a-z]{2,5}$/i,
            },
            required: "Email is required",
          })}
          error={errors.email}
          inputMode="email"
          label="Email"
          name="email"
          onFocus={() => {
            clearErrors("email");
          }}
          positionIconLeft
          required
          type="email"
        />

        <Input
          className="mt-4 md:w-full"
          componentRef={register({
            required: "Emergency contact name is required",
          })}
          error={errors.emergencyContactName}
          label="Emergency Contact Name"
          name="emergencyContactName"
          onFocus={() => {
            clearErrors("emergencyContactName");
          }}
          required
        />
        <Input
          className="mt-4 md:w-full"
          componentRef={register({
            required: "Emergency contact phone number is required",
          })}
          error={errors.emergencyContactNumber}
          inputMode="tel"
          label="Emergency Contact Number"
          name="emergencyContactNumber"
          onFocus={() => {
            clearErrors("emergencyContactNumber");
          }}
          positionIconLeft
          required
          type="tel"
        />
      </div>
      <div className="flex justify-between max-w-2xl mt-8">
        <Anchor href="/new-starter">
          <div className="hidden md:block">
            <SecondaryButton>Previous</SecondaryButton>
          </div>
        </Anchor>
        <PrimaryButton className="w-full md:w-auto">Next</PrimaryButton>
      </div>
    </form>
  );
}
