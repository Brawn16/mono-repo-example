import { AddressLookup } from "@sdh-project-services/nucleus-ui/dist/address-lookup";
import { AddressLookupAddress } from "@sdh-project-services/nucleus-ui/dist/address-lookup/types";
import {
  PrimaryButton,
  SecondaryButton,
} from "@sdh-project-services/nucleus-ui/dist/button";
import { Input } from "@sdh-project-services/nucleus-ui/dist/input";
import { capitalCase } from "change-case";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Anchor } from "../../../components/anchor";
import { Context } from "../../../layouts/new-starter/context";
import { NewStarterAddressFormData } from "./types";

export function Form() {
  const { submitStep, values } = useContext(Context);
  const { errors, handleSubmit, register, setValue, watch } = useForm<
    NewStarterAddressFormData
  >({ defaultValues: values });

  const handleAddressSelection = (address: AddressLookupAddress) => {
    const keys = Object.keys(address) as (keyof AddressLookupAddress)[];

    keys.forEach((key: keyof AddressLookupAddress) => {
      setValue(`address${capitalCase(key).replace(/\s/g, "")}`, address[key]);
    });
  };

  useEffect(() => {
    register({ name: "addressLine1" });
    register({ name: "addressLine2" });
    register({ name: "addressTownCity" });
    register({ name: "addressCounty" });
    register({ name: "addressPostcode" });
  }, []);

  const handleFormSubmit = (data: NewStarterAddressFormData) => {
    submitStep(2, data);
  };
  const watchAddress = watch();

  const {
    addressLine1,
    addressLine2,
    addressCounty,
    addressPostcode,
    addressTownCity,
  } = watchAddress;

  return (
    <>
      <Anchor className="flex mt-4" href="/new-starter/personal-details">
        {`<`}
        <p className="underline">Back</p>
      </Anchor>
      <p className="mt-4 text-xl font-bold md:mt-8 md:text-3xl">
        What is your home address?
      </p>
      <div className="max-w-2xl md:flex-col md:items-center">
        {!addressLine1 && (
          <div className="flex flex-col py-4 font-bold">
            <AddressLookup onAddressSelect={handleAddressSelection} />
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="max-w-2xl py-6">
          {watchAddress.addressLine1 && (
            <>
              {" "}
              <Input
                className=""
                error={errors.line1}
                label="Address"
                name="addressLine1"
                value={addressLine1}
              />
              <Input
                className="mt-4"
                name="addressLine2"
                value={addressLine2}
              />
            </>
          )}
        </div>
        <div className="max-w-2xl">
          {watchAddress.addressLine1 && (
            <>
              <Input
                className="mt-4"
                label="Town/City"
                name="addressTownCity"
                value={addressTownCity}
              />
              <Input
                className="mt-4"
                label="County"
                name="addressCounty"
                value={addressCounty}
              />
              <Input
                className="mt-4"
                error={errors.postcode}
                label="Postcode"
                name="addressPostcode"
                value={addressPostcode}
              />
            </>
          )}
        </div>

        <div className="flex justify-between max-w-2xl mt-8">
          <Anchor href="/new-starter/personal-details">
            <div className="hidden md:block">
              <SecondaryButton>Back</SecondaryButton>
            </div>
          </Anchor>
          <PrimaryButton className="w-full md:w-auto">Continue</PrimaryButton>
        </div>
      </form>
    </>
  );
}
