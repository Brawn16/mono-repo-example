/* eslint-disable no-script-url */
import { action } from "@storybook/addon-actions";
import React from "react";
import { Steps } from ".";

export default {
  component: Steps,
  title: "Steps"
};

const standardSteps = [
  { label: "Dashboard", path: "javascript:void(0)" },
  { label: "Customers", path: "javascript:void(0)" },
  { label: "Mr Smith", path: "javascript:void(0)" }
];

const disabledSteps = [
  { label: "Dashboard", path: "javascript:void(0)" },
  { label: "Customers", path: "javascript:void(0)", disabled: true },
  { label: "Mr Smith", path: "javascript:void(0)", disabled: true }
];

export const steps = () => {
  return (
    <Steps
      active="Mr Smith"
      onClick={action("clicked")}
      steps={standardSteps}
    />
  );
};

export const stepItemsDisabled = () => {
  return (
    <Steps
      active="Mr Smith"
      onClick={action("clicked")}
      steps={disabledSteps}
    />
  );
};
