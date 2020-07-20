import axios from "axios";
import React, { useState } from "react";
import Select from "react-select";
import { Button } from "../button";
import { Input } from "../input";
import { FormattedAddress, Address, AddressLookupProps } from "./types";

const formatResponse = (data: any) => {
  const { latitude, longitude, postcode, addresses } = data;
  const formattedData = addresses.map((address: any) => {
    const addressString = address.formatted_address.join(" ");
    const newAddress: FormattedAddress = {
      value: address,
      label: addressString,
      latitude,
      longitude,
      postcode,
    };
    return newAddress;
  });
  return formattedData;
};

export const AddressLookup = ({ onAddressSelect }: AddressLookupProps) => {
  const [addressOptions, setAddressOptions] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const [postcode, setPostcode] = useState("");
  const [apiError, setError] = useState({
    message: "",
    type: "error",
  });

  const handleSelection = (address: any) => {
    onAddressSelect(address);
    setAddressOptions([]);
  };

  const errorMessaging = (message: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      return setError({
        message,
        type: "error",
      });
    }, 500);
  };

  const handleOnClick = async () => {
    try {
      errorMessaging("");
      const { status, data } = await axios.get(
        `https://api.getAddress.io/find/${postcode}?api-key=${process.env.GET_ADDRESS_API_KEY}&expand=true`
      );

      if (status === 200) {
        errorMessaging("");
        const formatted = formatResponse(data);
        return setAddressOptions(formatted);
      }

      return errorMessaging("Postcode not valid, please check and try again.");
    } catch (error) {
      const { status } = error.response;

      if (status === 404) {
        setAddressOptions([]);
        return errorMessaging(
          "Postcode not found, please check and try again."
        );
      }

      errorMessaging("Postcode not valid, please check and try again.");
      return setAddressOptions([]);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPostcode(value.toLocaleUpperCase());
  };

  return (
    <>
      <div className="flex-col">
        <p>postcode</p>
        <div className="flex h-12 pb-2">
          <Input
            className="w-full mr-2"
            error={apiError.message.length > 0 ? apiError : undefined}
            name="address"
            onChange={handleChange}
            value={postcode}
          />

          <Button loading={loading} onClick={handleOnClick}>
            Submit
          </Button>
        </div>
      </div>
      {addressOptions.length > 0 && (
        <Select onChange={handleSelection} options={addressOptions} />
      )}
    </>
  );
};
