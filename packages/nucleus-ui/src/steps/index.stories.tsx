/* eslint-disable no-script-url */
import React from "react";
import { Steps } from ".";

export default {
  component: Steps,
  title: "Steps",
};

const stepsItems = [
  { label: "Dashboard", path: "javascript:void(0)" },
  { label: "Customers", path: "javascript:void(0);" },
  { label: "Mr Smith", path: "javascript:void(0);" },
];

const disabledItems = [
  { label: "Dashboard", path: "javascript:void(0)" },
  { label: "Customers", path: "javascript:void(0);", disabled: true },
  { label: "Mr Smith", path: "javascript:void(0);", disabled: true },
];

export const steps = () => {
  return <Steps active="Mr Smith" items={stepsItems} />;
};

export const stepItemsDisabled = () => {
  return <Steps active="Mr Smith" items={disabledItems} />;
};
