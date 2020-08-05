import { action } from "@storybook/addon-actions";
import React from "react";
import { Textarea } from ".";

export default {
  component: Textarea,
  title: "Textarea"
};

export const textarea = () => {
  return (
    <Textarea label="Textarea" name="textarea" onChange={action("onChange")} />
  );
};

export const withError = () => {
  const error = {
    message: "Please provide some text",
    type: "error"
  };

  return (
    <Textarea
      error={error}
      label="Textarea"
      name="textarea"
      onChange={action("onChange")}
    />
  );
};
