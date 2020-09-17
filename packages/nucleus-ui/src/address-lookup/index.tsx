import { useLazyQuery } from "@apollo/client";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { PrimaryButton } from "../button";
import { Input } from "../input";
import { InputError } from "../input-error";
import { Label } from "../label";
import { Select } from "../select";
import { Spinner } from "../spinner";
import { addressLookup as addressLookupQuery } from "./queries";
import {
  AddressLookupFormData,
  AddressLookupProps,
  AddressLookupAddress,
} from "./types";

export const AddressLookup = ({
  label = "Postcode",
  onAddressSelect,
}: AddressLookupProps) => {
  const { register, handleSubmit, errors } = useForm<AddressLookupFormData>();
  const [showDropdown, setShowDropdown] = useState(false);
  const [addressLookup, { data, error, loading }] = useLazyQuery(
    addressLookupQuery,
    {
      errorPolicy: "all",
    }
  );

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onAddressSelect(data.addressLookup[event.target.value]);
    setShowDropdown(false);
  };

  const onSubmit = ({ addressLookupPostcode }: AddressLookupFormData) => {
    setShowDropdown(true);
    addressLookup({
      variables: { postcode: addressLookupPostcode },
    });
  };

  const renderAddresses = (addresses: AddressLookupAddress[]) => {
    const options = addresses.map(
      (
        { line1, line2, line3, townCity, postcode }: AddressLookupAddress,
        index
      ) => {
        const optionLabel = [line1, line2, line3, townCity, postcode]
          .filter((value) => value)
          .join(", ");

        return {
          label: optionLabel,
          value: index.toString(),
        };
      }
    );

    return (
      <div className="mt-4">
        <Label label="Select your address from the list" />
        <Select
          name="addressLookupAddresses"
          onChange={handleChange}
          options={options}
          placeholder="Please select your address"
        />
      </div>
    );
  };

  return (
    <>
      <form className="relative" onSubmit={handleSubmit(onSubmit)}>
        <Label label={label} name="addressLookupPostcode" />
        <div className="flex">
          <Input
            className="max-w-xs mr-4"
            componentRef={register({
              required: "Postcode is required",
            })}
            name="addressLookupPostcode"
          />
          <PrimaryButton type="submit">Find address</PrimaryButton>
        </div>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
            <Spinner />
          </div>
        )}
        {error && (
          <InputError error={{ message: error.message, type: "apollo" }} />
        )}
        {errors.addressLookupPostcode && (
          <InputError error={errors.addressLookupPostcode} />
        )}
      </form>
      {showDropdown && data && renderAddresses(data.addressLookup)}
    </>
  );
};
