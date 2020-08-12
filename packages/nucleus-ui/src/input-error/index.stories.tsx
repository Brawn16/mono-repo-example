import React from "react";
import { InputError } from ".";

export default {
  component: InputError,
  title: "Input Error"
};

export const inputError = () => {
  const error = {
    message: "Please provide a valid email",
    type: "error"
  };

  return <InputError error={error} />;
};
