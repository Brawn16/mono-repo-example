import { AddressLookup } from "@sdh-project-services/nucleus-ui/dist/address-lookup";
import { AddressLookupAddress } from "@sdh-project-services/nucleus-ui/dist/address-lookup/types";
import {
  PrimaryButton,
  SecondaryButton,
} from "@sdh-project-services/nucleus-ui/dist/button";
import { Input } from "@sdh-project-services/nucleus-ui/dist/input";
import { capitalCase } from "change-case";
import React, { useContext, useEffect, useState } from "react";
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
    register,
    setValue,
    watch,
    reset,
  } = useForm<NewStarterAddressFormData>({ defaultValues: values });

  const [resetFlag, setResetFlag] = useState(false);

  useEffect(() => {
    register({ name: "addressLine1" }, { required: true });
    register({ name: "addressLine2" });
    register({ name: "addressTownCity" });
    register({ name: "addressCounty" });
    register({ name: "addressPostcode" }, { required: true });
  }, [resetFlag]);

  const handleAddressSelection = (address: AddressLookupAddress) => {
    const keys = Object.keys(address) as (keyof AddressLookupAddress)[];

    keys.forEach((key: keyof AddressLookupAddress) => {
      setValue(`address${capitalCase(key).replace(/\s/g, "")}`, address[key]);
    });
  };

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
  const hasError = errors.addressLine1 || errors.addressPostcode;
  console.log(errors);

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
          <div
            className="flex flex-col py-4 font-bold"
            onFocus={() => {
              clearErrors();
            }}
          >
            <AddressLookup onAddressSelect={handleAddressSelection} />
            <div>
              {hasError && (
                <p className="font-normal text-red-600">
                  Please select your address
                </p>
              )}
            </div>
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
                error={errors.addressLine1}
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
                error={errors.addressPostcode}
                label="Postcode"
                name="addressPostcode"
                value={addressPostcode}
              />
            </>
          )}
          {addressLine1 && (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <div
              className="my-4 underline"
              onClick={() => {
                setResetFlag(!resetFlag);
                reset();
              }}
              // eslint-disable-next-line jsx-a11y/aria-role
              role="input"
            >
              Search for another address
            </div>
          )}
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
