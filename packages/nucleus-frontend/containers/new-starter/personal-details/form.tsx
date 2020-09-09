import { Input } from "@sdh-project-services/nucleus-ui/dist/input";
import { PhoneNumberUtil } from "google-libphonenumber";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../../layouts/new-starter/context";
import { Navigation } from "../../../layouts/new-starter/navigation";
import { NewStarterPersonalDetailsFormData } from "./types";

function validatePhoneNumber(value?: string) {
  if (value === undefined || value === "") {
    return "Phone number is required";
  }

  try {
    new PhoneNumberUtil().parse(value, "GB");
  } catch (error) {
    return "Invalid phone number";
  }

  return true;
}

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
          label="First name"
          name="firstName"
          onKeyDown={() => clearErrors("firstName")}
          required
        />
        <Input
          className="mt-4 md:ml-4 md:mt-0 md:w-1/2"
          componentRef={register({
            required: "Last name is required",
          })}
          error={errors.lastName}
          label="Last name"
          name="lastName"
          onFocus={() => clearErrors("lastName")}
          required
        />
      </div>
      <Input
        className="mt-4 md:w-full"
        componentRef={register({
          validate: validatePhoneNumber,
        })}
        error={errors.phoneNumber}
        inputMode="tel"
        label="Phone number"
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
        label="Emergency contact name"
        name="emergencyContactName"
        onFocus={() => clearErrors("emergencyContactName")}
        required
      />
      <Input
        className="mt-4 md:w-full"
        componentRef={register({
          validate: validatePhoneNumber,
        })}
        error={errors.emergencyContactPhoneNumber}
        inputMode="tel"
        label="Emergency contact number"
        name="emergencyContactPhoneNumber"
        onFocus={() => clearErrors("emergencyContactPhoneNumber")}
        required
        type="tel"
      />
      <Navigation />
    </form>
  );
}
