import { AddressLookup } from "@sdh-project-services/nucleus-ui/dist/address-lookup";
import { AddressLookupAddress } from "@sdh-project-services/nucleus-ui/dist/address-lookup/types";
import {
  PrimaryButton,
  SecondaryButton,
} from "@sdh-project-services/nucleus-ui/dist/button";
import { Input } from "@sdh-project-services/nucleus-ui/dist/input";
import { pascalCase } from "change-case";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Anchor } from "../../../components/anchor";
import { Context } from "../../../layouts/new-starter/context";
import { NewStarterAddressFormData } from "./types";

export function Form() {
  const { submitStep, values } = useContext(Context);
  const {
    errors,
    clearErrors,
    handleSubmit,
    getValues,
    register,
    setValue,
    watch,
    reset,
  } = useForm<NewStarterAddressFormData>({
    defaultValues: values,
  });

  register({ name: "addressLine1" }, { required: "This field is required" });
  register({ name: "addressLine2" });
  register({ name: "addressTownCity" });
  register({ name: "addressCounty" });
  register({ name: "addressPostcode" }, { required: "This field is required" });

  const handleAddressSelection = (address: AddressLookupAddress) => {
    const keys = Object.keys(address) as (keyof AddressLookupAddress)[];

    keys.forEach((key: keyof AddressLookupAddress) => {
      setValue(`address${pascalCase(key)}`, address[key]);
    });
  };

  const handleFormSubmit = (data: NewStarterAddressFormData) => {
    submitStep(2, data);
  };

  const watchAddressLine1 = watch("addressLine1");

  const {
    addressLine1,
    addressLine2,
    addressCounty,
    addressPostcode,
    addressTownCity,
  } = getValues();

  const hasError = errors.addressLine1 || errors.addressPostcode;

  return (
    <>
      <p className="mt-4 text-xl font-bold md:mt-8 md:text-3xl">
        What is your home address?
      </p>
      <div className="max-w-2xl md:flex-col md:items-center">
        {!watchAddressLine1 && (
          <div
            className="flex flex-col py-4 font-bold"
            onFocus={() => clearErrors()}
          >
            <AddressLookup onAddressSelect={handleAddressSelection} />
            {hasError && (
              <p className="font-normal text-red-600">
                Please select your address.
              </p>
            )}
            <button
              className="mt-2 text-right text-gray-600 underline focus:outline-none"
              onClick={() => setValue("addressLine1", "")}
              type="button"
            >
              Manually enter address
            </button>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="max-w-2xl py-6">
          {watchAddressLine1 !== undefined && (
            <>
              <Input
                className=""
                error={errors.addressLine1}
                label="Address"
                name="addressLine1"
                onChange={event => setValue("addressLine1", event.target.value)}
                onKeyDown={() => clearErrors("addressLine1")}
                value={addressLine1}
              />
              <Input
                className="mt-4"
                name="addressLine2"
                onChange={event => setValue("addressLine2", event.target.value)}
                value={addressLine2}
              />
            </>
          )}
        </div>
        <div className="max-w-2xl">
          {watchAddressLine1 !== undefined && (
            <>
              <Input
                className="mt-4"
                label="Town/City"
                name="addressTownCity"
                onChange={event => setValue("addressTownCity", event.target.value)}
                value={addressTownCity}
              />
              <Input
                className="mt-4"
                label="County"
                name="addressCounty"
                onChange={event => setValue("addressCounty", event.target.value)}
                value={addressCounty}
              />
              <Input
                className="mt-4"
                error={errors.addressPostcode}
                label="Postcode"
                name="addressPostcode"
                onChange={event => setValue("addressPostcode", event.target.value)}
                onKeyDown={() => clearErrors("addressPostcode")}
                value={addressPostcode}
              />
            </>
          )}
          <button
            className="my-4 underline focus:outline-none"
            onClick={() => reset({})}
            type="button"
          >
            Search for another address
          </button>
        </div>
        <div className="flex justify-between max-w-2xl mt-8">
          <Anchor href="/new-starter/personal-details">
            <div className="hidden md:block">
              <SecondaryButton>Previous</SecondaryButton>
            </div>
          </Anchor>
          <PrimaryButton className="w-full md:w-auto">Next</PrimaryButton>
        </div>
      </form>
    </>
  );
}
