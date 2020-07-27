import {
  PrimaryButton,
  Button
} from "@sdh-project-services/nucleus-ui/dist/button";
import { Fieldset } from "@sdh-project-services/nucleus-ui/dist/fieldset";
import { Input } from "@sdh-project-services/nucleus-ui/dist/input";
import React from "react";
import { useForm } from "react-hook-form";
import { AiOutlineMail } from "react-icons/ai";
import { FiPhone } from "react-icons/fi";
import { Anchor } from "../../../components/anchor";
import { Head } from "../../../components/head";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";
import { NewStarterPersonalDetailsFormData } from "./types";

export function PersonalDetails(): React.ReactElement {
  const { register, handleSubmit, errors } = useForm<
    NewStarterPersonalDetailsFormData
  >();

  return (
    <>
      <Head title="Personal Details - New Starter Form" />
      <NewStarterLayout>
        <form
          onSubmit={handleSubmit(data => {
            /* eslint-disable-next-line no-console */
            console.log("data", data);
          })}
        >
          <Fieldset>
            <div className="md:flex">
              <Input
                className="md:pr-2 md:w-1/2"
                componentRef={register({
                  required: "First name is required"
                })}
                error={errors.firstName}
                label="First Name"
                name="firstName"
                required
              />
              <Input
                className="md:pl-2 md:w-1/2"
                componentRef={register({
                  required: "Last name is required"
                })}
                error={errors.lastName}
                label="Last Name"
                name="lastName"
                required
              />
            </div>
            <hr className="my-8 border-orange-500" />
            <div className="md:flex">
              <Input
                className="md:pr-2 md:w-1/2"
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
                className="md:pl-2 md:w-1/2"
                componentRef={register({
                  pattern: {
                    message: "Invalid email address.",
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
            <hr className="my-8 border-orange-500" />
            <div className="md:flex">
              <Input
                className="md:pr-2 md:w-1/2"
                componentRef={register({
                  required: "Emergency contact name is required"
                })}
                error={errors.emergencyContactName}
                label="Emergency Contact Name"
                name="emergencyContactName"
                required
              />
              <Input
                className="md:pl-2 md:w-1/2"
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
          </Fieldset>
          <div className="flex justify-between mx-8 mt-8 md:mx-0">
            <Anchor href="/new-starter">
              <Button>Back</Button>
            </Anchor>
            <PrimaryButton>Continue</PrimaryButton>
          </div>
        </form>
      </NewStarterLayout>
    </>
  );
}
