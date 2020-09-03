import { Input } from "@sdh-project-services/nucleus-ui/dist/input";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../../layouts/new-starter/context";
import { Navigation } from "../../../layouts/new-starter/navigation";
import { NewStarterPersonalDetailsFormData } from "./types";

export function Form() {
  const { submitStep, values } = useContext(Context);
  const { errors, handleSubmit, register, clearErrors } = useForm<
    NewStarterPersonalDetailsFormData
  >({ defaultValues: values });

  const handleFormSubmit = (data: NewStarterPersonalDetailsFormData) => {
    submitStep(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="md:flex">
        <Input
          className="md:mr-4 md:w-1/2"
          componentRef={register({
            required: "First name is required",
          })}
          error={errors.firstName}
          help="Please enter your legal first name"
          label="First Name"
          name="firstName"
          onKeyDown={() => clearErrors("firstName")}
          required
        />
        <Input
          className="md:ml-4 md:w-1/2"
          componentRef={register({
            required: "Last name is required",
          })}
          error={errors.lastName}
          label="Last Name"
          name="lastName"
          onFocus={() => clearErrors("lastName")}
          required
        />
      </div>
      <Input
        className="mt-4 md:w-full"
        componentRef={register({
          required: "Phone number is required",
        })}
        error={errors.phoneNumber}
        inputMode="tel"
        label="Phone Number"
        name="phoneNumber"
        onFocus={() => clearErrors("phoneNumber")}
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
        onFocus={() => clearErrors("email")}
        required
        type="email"
      />
      <Input
        className="mt-4 md:w-full"
        componentRef={register({
          required: "Emergency contact name is required",
        })}
        error={errors.emergencyContactName}
        help="We will only use these details in case of an emergency"
        label="Emergency Contact Name"
        name="emergencyContactName"
        onFocus={() => clearErrors("emergencyContactName")}
        required
      />
      <Input
        className="mt-4 md:w-full"
        componentRef={register({
          required: "Emergency contact phone number is required",
        })}
        error={errors.emergencyContactPhoneNumber}
        inputMode="tel"
        label="Emergency Contact Number"
        name="emergencyContactPhoneNumber"
        onFocus={() => clearErrors("emergencyContactPhoneNumber")}
        required
        type="tel"
      />
      <Navigation />
    </form>
  );
}
