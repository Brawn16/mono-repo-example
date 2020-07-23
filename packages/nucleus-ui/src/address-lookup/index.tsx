import { useLazyQuery } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { PrimaryButton } from "../button";
import { Input } from "../input";
import { InputError } from "../input-error";
import { Label } from "../label";
import { Select } from "../select";
import { addressLookup as addressLookupQuery } from "./queries";
import {
  AddressLookupFormData,
  AddressLookupProps,
  AddressLookupAddress
} from "./types";

export const AddressLookup = ({ label = "Postcode" }: AddressLookupProps) => {
  const { register, handleSubmit, errors } = useForm<AddressLookupFormData>();
  const [addressLookup, { data, error }] = useLazyQuery(addressLookupQuery, {
    errorPolicy: "all"
  });

  const onSubmit = ({ addressLookupPostcode }: AddressLookupFormData) => {
    addressLookup({
      variables: { postcode: addressLookupPostcode }
    });
  };

  const renderAddresses = (addresses: AddressLookupAddress[]) => {
    const options = addresses.map(
      (
        { line1, line2, line3, city, postcode }: AddressLookupAddress,
        index
      ) => {
        const optionLabel = [line1, line2, line3, city, postcode]
          .filter(value => value !== "")
          .join(", ");

        return {
          label: optionLabel,
          value: index.toString()
        };
      }
    );

    return <Select name="addressLookupAddresses" options={options} />;
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex-col">
          <Label label={label} name="addressLookup" />
          <div className="flex">
            <Input
              className="w-full"
              componentRef={register({
                required: "Postcode is required"
              })}
              name="addressLookupPostcode"
            />
            <PrimaryButton>Search</PrimaryButton>
          </div>
          {error && (
            <InputError error={{ message: error.message, type: "apollo" }} />
          )}
          {errors.addressLookupPostcode && (
            <InputError error={errors.addressLookupPostcode} />
          )}
        </div>
      </form>
      {data && renderAddresses(data.addressLookup)}
    </>
  );
};
