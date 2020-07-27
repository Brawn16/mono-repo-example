import { action } from "@storybook/addon-actions";
import React from "react";
import { RadioButton } from ".";

export default {
  component: RadioButton,
  title: "Radio Button",
};

export const radioButton = () => {
  return (
    <>
      <RadioButton
        label="Option 1"
        onChange={action("clicked")}
        value="OptionOne"
      />
      <RadioButton
        checked
        label="Option 2"
        onChange={action("clicked")}
        value="OptionTwo"
      />
    </>
  );
};
