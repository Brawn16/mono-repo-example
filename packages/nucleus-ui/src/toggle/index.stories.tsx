import { action } from "@storybook/addon-actions";
import React from "react";
import { Toggle } from ".";

export default {
  component: Toggle,
  title: "Toggle",
};

export const basicToggle = () => {
  return (
    <>
      <Toggle label="Toggle" name="toggle1" onChange={action("onChange")} />
    </>
  );
};
