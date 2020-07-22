/* eslint-disable @typescript-eslint/camelcase */
import { AddressLookup } from "@sdh-project-services/nucleus-ui/dist/address-lookup";
import {
  PrimaryButton,
  Button,
} from "@sdh-project-services/nucleus-ui/dist/button";
import { Fieldset } from "@sdh-project-services/nucleus-ui/dist/fieldset";
import { Input } from "@sdh-project-services/nucleus-ui/dist/input";
import React from "react";
import { useForm } from "react-hook-form";
import { Head } from "../../../components/head";
import { NewStarter as NewStarterLayout } from "../../../layouts/new-starter";
import { AddressProps, InputValueProps } from "./types";

export function AddressDetails() {
  const { register, handleSubmit, errors, setValue } = useForm<AddressProps>();

  const handleAddressSelection = (address: any) => {
    const { line_1, line_2, line_3, town_or_city } = address.value;
    const { postcode } = address;
    const inputValues: InputValueProps = {
      postcode,
      city: town_or_city,
      addressLineOne: line_1,
      addressLineTwo: line_2,
      addressLineThree: line_3,
    };
    Object.keys(inputValues).forEach((value) => {
      setValue(value, inputValues.postcode);
    });
  };

  return (
    <div>
      <Head title="New Starter Form" />
      <NewStarterLayout>
        <div className="md:flex-col md:items-center md:flex w-all">
          <div className="flex flex-col md:w-1/2">
            <AddressLookup onAddressSelect={handleAddressSelection} />
            <div className="flex items-center justify-center  py-6">
              <hr className="w-1/2 border-orange-600" />
              <p className="px-2 text-gray-500">OR</p>
              <hr className="w-1/2 border-orange-600" />
            </div>
            <div className="flex justify-center pb-5 text-gray-500">
              <p>ENTER YOUR ADDRESS MANUALLY</p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
        >
          <Fieldset>
            <div className="md:flex">
              <Input
                className="md:pr-2 md:w-1/2"
                componentRef={register({
                  required: "this field is required",
                })}
                error={errors.addressLineOne}
                label="Address Line 1"
                name="addressLineOne"
                required
              />
              <Input
                className="md:pl-2 md:w-1/2"
                label="Address Line 2"
                name="addressLineTwo"
              />
            </div>
            <div className="md:flex">
              <Input
                className="md:pr-2 md:w-1/2"
                label="Address Line 3"
                name="addressLineThree"
              />
              <Input className="md:pl-2 md:w-1/2" label="City" name="city" />
            </div>
            <Input
              className="md:w-1/4"
              componentRef={register({
                required: "Postcode is required",
              })}
              error={errors.postcode}
              label="Postcode"
              name="postcode"
              required
            />
          </Fieldset>
          <div className="flex justify-between py-4">
            <Button>Back</Button>
            <PrimaryButton type="submit">Continue</PrimaryButton>
          </div>
        </form>
      </NewStarterLayout>
    </div>
  );
}
