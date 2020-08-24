import { action } from "@storybook/addon-actions";
import React from "react";
import { Upload } from ".";

export default {
  component: Upload,
  title: "Upload",
};

export const upload = () => {
  return <Upload onChange={action("onChange")} tags={["example"]} />;
};
