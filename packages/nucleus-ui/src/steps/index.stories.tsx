/* eslint-disable no-script-url */
import React from "react";
import { Steps } from ".";

export default {
  component: Steps,
  title: "Steps",
};

const stepsItems = [
  { label: "Fred", path: "javascript:void(0)" },
  { label: "Wilma", path: "javascript:void(0);" },
  { label: "Barney", path: "javascript:void(0);" },
];

export const singleStep = () => {
  return <Steps active="Wilma" items={stepsItems} />;
};
