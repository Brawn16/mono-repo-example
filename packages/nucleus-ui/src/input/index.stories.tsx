import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { Input } from ".";

export default {
  component: Input,
  title: "Input",
};

export const basicInput = () => {
  return <Input label="Name" name="basic-input" />;
};

export const inputWithIcon = () => {
  return (
    <div className="space-y-6">
      <Input iconType={AiOutlineMail} label="Email" name="input error" />
      <Input
        iconType={AiOutlineMail}
        label="Email"
        name="input error"
        positionIconLeft
      />
    </div>
  );
};

export const inputError = () => {
  const fieldError = {
    message: "Please provide a valid email",
    type: "error",
  };
  return (
    <Input
      error={fieldError}
      iconType={AiOutlineMail}
      label="Email"
      name="input error"
    />
  );
};
