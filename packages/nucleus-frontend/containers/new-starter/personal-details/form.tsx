import {
  PrimaryButton,
  Button
} from "@sdh-project-services/nucleus-ui/dist/button";
import { Input } from "@sdh-project-services/nucleus-ui/dist/input";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineMail } from "react-icons/ai";
import { FiPhone } from "react-icons/fi";
import { Anchor } from "../../../components/anchor";
import { Context } from "../../../layouts/new-starter/context";
import { NewStarterPersonalDetailsFormData } from "./types";

export function Form(): React.ReactElement {
  const { submitStep, values } = useContext(Context);
  const { errors, handleSubmit, register } = useForm<
    NewStarterPersonalDetailsFormData
  >({ defaultValues: values });

  const handleFormSubmit = (data: NewStarterPersonalDetailsFormData) => {
    submitStep(1, data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="md:flex">
        <Input
          className="mt-4 md:mr-4 md:w-1/2"
          componentRef={register({
            required: "First name is required"
          })}
          error={errors.firstName}
          label="First Name"
          name="firstName"
          required
        />
        <Input
          className="mt-4 md:ml-4 md:w-1/2"
          componentRef={register({
            required: "Last name is required"
          })}
          error={errors.lastName}
          label="Last Name"
          name="lastName"
          required
        />
      </div>
      <div className="md:flex">
        <Input
          className="mt-4 md:mr-4 md:w-1/2"
          componentRef={register({
            required: "Phone number is required"
          })}
          error={errors.phoneNumber}
          iconType={FiPhone}
          inputMode="tel"
          label="Phone Number"
          name="phoneNumber"
          positionIconLeft
          required
          type="tel"
        />
        <Input
          className="mt-4 md:ml-4 md:w-1/2"
          componentRef={register({
            pattern: {
              message: "Invalid email address",
              value: /^[\w%+.-]+@[\d.a-z-]+\.[a-z]{2,5}$/i
            },
            required: "Email is required"
          })}
          error={errors.email}
          iconType={AiOutlineMail}
          inputMode="email"
          label="Email"
          name="email"
          positionIconLeft
          required
        />
      </div>
      <div className="md:flex">
        <Input
          className="mt-4 md:mr-4 md:w-1/2"
          componentRef={register({
            required: "Emergency contact name is required"
          })}
          error={errors.emergencyContactName}
          label="Emergency Contact Name"
          name="emergencyContactName"
          required
        />
        <Input
          className="mt-4 md:ml-4 md:w-1/2"
          componentRef={register({
            required: "Emergency contact number is required"
          })}
          error={errors.emergencyContactNumber}
          iconType={FiPhone}
          inputMode="tel"
          label="Emergency Contact Number"
          name="emergencyContactNumber"
          positionIconLeft
          required
          type="tel"
        />
      </div>
      <div className="flex justify-between mx-8 mt-8 md:mx-0">
        <Anchor href="/new-starter">
          <Button>Back</Button>
        </Anchor>
        <PrimaryButton>Continue</PrimaryButton>
      </div>
    </form>
  );
}
