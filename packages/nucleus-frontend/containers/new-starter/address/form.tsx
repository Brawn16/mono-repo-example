import { AddressLookup } from "@sdh-project-services/nucleus-ui/dist/address-lookup";
import { AddressLookupAddress } from "@sdh-project-services/nucleus-ui/dist/address-lookup/types";
import {
  PrimaryButton,
  Button,
} from "@sdh-project-services/nucleus-ui/dist/button";
import { Input } from "@sdh-project-services/nucleus-ui/dist/input";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Anchor } from "../../../components/anchor";
import { Context } from "../../../layouts/new-starter/context";
import { NewStarterAddressFormData } from "./types";

export function Form() {
  const { submitStep, values } = useContext(Context);
  const { errors, handleSubmit, register, setValue } = useForm<
    NewStarterAddressFormData
  >({ defaultValues: values });

  const handleAddressSelection = (address: AddressLookupAddress) => {
    const keys = Object.keys(address) as (keyof AddressLookupAddress)[];
    keys.forEach((key: keyof AddressLookupAddress) => {
      setValue(key, address[key]);
    });
  };

  const handleFormSubmit = (data: NewStarterAddressFormData) => {
    submitStep(2, data);
  };

  return (
    <>
      <div className="md:flex-col md:items-center md:flex w-all">
        <div className="flex flex-col md:w-1/2">
          <AddressLookup onAddressSelect={handleAddressSelection} />
          <div className="flex items-center justify-center  py-6">
            <hr className="w-1/2 border-orange-600" />
            <p className="px-2 text-gray-500">OR</p>
            <hr className="w-1/2 border-orange-600" />
          </div>
          <div className="flex justify-center pb-5 text-gray-500 uppercase">
            Enter your address manually
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="md:flex">
          <Input
            className="md:pr-4 md:w-1/2"
            componentRef={register({
              required: "Address line 1 is required",
            })}
            error={errors.line1}
            label="Address Line 1"
            name="line1"
            required
          />
          <Input
            className="mt-4 md:mt-0 md:pl-4 md:w-1/2"
            componentRef={register}
            label="Address Line 2"
            name="line2"
          />
        </div>
        <div className="md:flex">
          <Input
            className="mt-4 md:pr-4 md:w-1/2"
            componentRef={register}
            label="Address Line 3"
            name="line3"
          />
          <Input
            className="mt-4 md:pl-4 md:w-1/2"
            componentRef={register}
            label="Town/City"
            name="townCity"
          />
        </div>
        <div className="md:flex">
          <Input
            className="mt-4 md:pr-4 md:w-1/2"
            componentRef={register}
            label="County"
            name="county"
          />
          <Input
            className="mt-4 md:pl-4 md:w-1/2"
            componentRef={register({
              required: "Postcode is required",
            })}
            error={errors.postcode}
            label="Postcode"
            name="postcode"
            required
          />
        </div>
        <div className="flex justify-between mx-8 mt-8 md:mx-0">
          <Anchor href="/new-starter/personal-details">
            <Button>Back</Button>
          </Anchor>
          <PrimaryButton>Continue</PrimaryButton>
        </div>
      </form>
    </>
  );
}
