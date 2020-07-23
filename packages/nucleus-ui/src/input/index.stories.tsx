import { action } from "@storybook/addon-actions";
import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { Input } from ".";

export default {
  component: Input,
  title: "Input",
};

export const input = () => {
  return <Input label="Name" name="input" onChange={action("onChange")} />;
};

export const withIcon = () => {
  return (
    <div className="space-y-8">
      <Input
        iconType={AiOutlineMail}
        label="Right Icon"
        name="input error"
        onChange={action("onChange")}
      />
      <Input
        iconType={AiOutlineMail}
        label="Left Icon"
        name="withIcon"
        onChange={action("onChange")}
        positionIconLeft
      />
    </div>
  );
};

export const withError = () => {
  const error = {
    message: "Please provide a valid email",
    type: "error",
  };

  return (
    <Input
      error={error}
      label="Input"
      name="inputError"
      onChange={action("onChange")}
    />
  );
};
