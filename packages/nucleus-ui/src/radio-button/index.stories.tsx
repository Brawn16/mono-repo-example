import { action } from "@storybook/addon-actions";
import React from "react";
import { RadioButton } from ".";

export default {
  component: RadioButton,
  title: "RadioButton"
};

export const radioButton = () => {
  return (
    <>
      <RadioButton
        checked
        label="Option 1"
        onClick={action("clicked")}
        value="OptionOne"
      />
      <RadioButton
        checked={false}
        label="Option 2"
        onClick={action("clicked")}
        value="OptionTwo"
      />
    </>
  );
};
