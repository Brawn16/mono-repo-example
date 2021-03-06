import { AddressLookup } from "@sdh-project-services/nucleus-ui/dist/address-lookup";
import { AddressLookupAddress } from "@sdh-project-services/nucleus-ui/dist/address-lookup/types";
import { Input } from "@sdh-project-services/nucleus-ui/dist/input";
import { InputError } from "@sdh-project-services/nucleus-ui/dist/input-error";
import { pascalCase } from "change-case";
import { postcodeValidator } from "postcode-validator";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../../layouts/new-starter/context";
import { Navigation } from "../../../layouts/new-starter/navigation";
import { NewStarterAddressFormData } from "./types";

function validatePostcode(value?: string) {
  if (value === undefined || value === "") {
    return "Postcode is required";
  }

  if (postcodeValidator(value, "UK") === false) {
    return "Invalid postcode";
  }

  return true;
}

export function Form() {
  const { submitStep, values } = useContext(Context);
  const {
    errors,
    clearErrors,
    handleSubmit,
    getValues,
    register,
    setValue,
    reset,
  } = useForm<NewStarterAddressFormData>({
    defaultValues: values,
  });

  const [showAddressFields, setShowAddressFields] = useState(
    values.addressLine1 !== undefined
  );

  const hasError = errors.addressLine1 || errors.addressPostcode;

  register({ name: "addressLine1" }, { required: "Address is required" });
  register({ name: "addressLine2" });
  register({ name: "addressTownCity" });
  register({ name: "addressCounty" });
  register({ name: "addressPostcode" }, { validate: validatePostcode });

  const {
    addressLine1,
    addressLine2,
    addressCounty,
    addressPostcode,
    addressTownCity,
  } = getValues();

  const handleAddressSelection = (address: AddressLookupAddress) => {
    const keys = Object.keys(address) as (keyof AddressLookupAddress)[];
    keys.forEach((key: keyof AddressLookupAddress) => {
      setValue(`address${pascalCase(key)}`, address[key]);
    });
    setShowAddressFields(true);
  };

  const handleFormSubmit = (data: NewStarterAddressFormData) => {
    submitStep(data);
  };

  return (
    <>
      {showAddressFields === false && (
        <div onFocus={() => clearErrors()}>
          <AddressLookup onAddressSelect={handleAddressSelection} />
          {hasError && (
            <InputError
              error={{
                message: "Please find your address",
                type: "manual",
              }}
            />
          )}
          <button
            className="mt-4 font-medium underline focus:outline-none duration-150 ease-in-out transition hover:text-gray-900 focus:text-gray-900"
            onClick={() => {
              setShowAddressFields(true);
            }}
            type="button"
          >
            Or manually enter address
          </button>
        </div>
      )}
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {showAddressFields !== false && (
          <>
            <Input
              error={errors.addressLine1}
              label="Address"
              name="addressLine1"
              onChange={(event) => setValue("addressLine1", event.target.value)}
              onKeyDown={() => {
                if (errors.addressLine1) {
                  clearErrors("addressLine1");
                }
              }}
              required
              value={addressLine1}
            />
            <Input
              className="mt-4"
              name="addressLine2"
              onChange={(event) => setValue("addressLine2", event.target.value)}
              value={addressLine2}
            />
            <Input
              className="mt-4"
              label="Town/City"
              name="addressTownCity"
              onChange={(event) =>
                setValue("addressTownCity", event.target.value)
              }
              value={addressTownCity}
            />
            <Input
              className="mt-4"
              label="County"
              name="addressCounty"
              onChange={(event) =>
                setValue("addressCounty", event.target.value)
              }
              value={addressCounty}
            />
            <Input
              className="mt-4"
              error={errors.addressPostcode}
              label="Postcode"
              name="addressPostcode"
              onChange={(event) =>
                setValue("addressPostcode", event.target.value)
              }
              onKeyDown={() => {
                if (errors.addressPostcode !== undefined)
                  clearErrors("addressPostcode");
              }}
              required
              value={addressPostcode}
            />
            <button
              className="mt-4 font-medium underline focus:outline-none duration-150 ease-in-out transition hover:text-gray-900 focus:text-gray-900"
              onClick={() => {
                reset({});
                setShowAddressFields(false);
              }}
              type="button"
            >
              Search for another address
            </button>
          </>
        )}
        <Navigation />
      </form>
    </>
  );
}
