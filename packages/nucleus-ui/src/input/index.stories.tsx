import React from "react";
import { FaBeer } from "react-icons/fa";
import { Input } from ".";

export default {
  component: Input,
  title: "Input",
};

export const basicInput = () => {
  return <Input label="basic" name="basic-input" />;
};

export const inputWithIcon = () => {
  return (
    <div className="space-y-6">
      <Input iconType={FaBeer} label="Name" name="input error" />
      <Input
        iconType={FaBeer}
        label="Name"
        name="input error"
        positionIconLeft
      />
    </div>
  );
};

export const inputError = () => {
  const fieldError = {
    message: "Please provide a name",
    type: "error",
  };
  return (
    <Input
      error={fieldError}
      iconType={FaBeer}
      label="Name"
      name="input error"
    />
  );
};
