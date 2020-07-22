import {
  PrimaryButton,
  Button,
} from "@sdh-project-services/nucleus-ui/dist/button";
import { Fieldset } from "@sdh-project-services/nucleus-ui/dist/fieldset";
import { Input } from "@sdh-project-services/nucleus-ui/dist/input";
import React from "react";
import { useForm } from "react-hook-form";
import { AiOutlineMail } from "react-icons/ai";
import { FiPhone } from "react-icons/fi";
import { Head } from "../../../components/head";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";
import { InputTypes } from "./types";

export function OperativeDetails(): React.ReactElement {
  const { register, handleSubmit, errors } = useForm<InputTypes>();
  return (
    <>
      <Head title="Operative Details" />
      <NewStarterLayout>
        <div className="p-6">
          <form
            onSubmit={handleSubmit((data) => {
              console.log("data", data);
            })}
          >
            <Fieldset className="p-6">
              <div className="md:flex">
                <Input
                  className="md:pr-2 md:w-1/2"
                  componentRef={register({
                    required: "First name is required",
                  })}
                  error={errors.firstName}
                  label="First Name"
                  name="firstName"
                />
                <Input
                  className="md:pl-2 md:w-1/2"
                  componentRef={register({
                    required: "Last name is required",
                  })}
                  error={errors.lastName}
                  label="Last Name"
                  name="lastName"
                />
              </div>

              <hr className="my-6 border-orange-600" />
              <div className="md:flex">
                <Input
                  className="md:pr-2 md:w-1/2"
                  componentRef={register({
                    required: "Phone number is required",
                  })}
                  error={errors.phoneNumber}
                  iconType={FiPhone}
                  inputMode="tel"
                  label="Phone Number"
                  name="phoneNumber"
                  positionIconLeft
                  type="tel"
                />
                <Input
                  className="md:pl-2 md:w-1/2"
                  componentRef={register({
                    pattern: {
                      message: "Invalid email address.",
                      value: /^[\w%+.-]+@[\d.a-z-]+\.[a-z]{2,5}$/i,
                    },
                    required: "Email is required",
                  })}
                  error={errors.email}
                  iconType={AiOutlineMail}
                  inputMode="email"
                  label="Email Address"
                  name="email"
                  positionIconLeft
                />
              </div>
              <hr className="my-6 border-orange-600" />
              <div className="md:flex">
                <Input
                  className="md:pr-2 md:w-1/2"
                  componentRef={register({
                    required: "Emergency contact name is required",
                  })}
                  error={errors.emergencyContactName}
                  label="Emergency Contact Name"
                  name="emergencyContactName"
                />
                <Input
                  className="md:pl-2 md:w-1/2"
                  componentRef={register({
                    required: "emergency phone number is required",
                  })}
                  error={errors.emergencyContactNumber}
                  iconType={FiPhone}
                  inputMode="tel"
                  label="Emergency Contact Number"
                  name="emergencyContactNumber"
                  positionIconLeft
                  type="tel"
                />
              </div>
            </Fieldset>
            <div className="flex justify-between py-4">
              <Button>Back</Button>
              <PrimaryButton>Continue</PrimaryButton>
            </div>
          </form>
        </div>
      </NewStarterLayout>
    </>
  );
}
