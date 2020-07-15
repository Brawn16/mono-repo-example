import React from "react";
import { Steps } from ".";

export default {
  component: Steps,
  title: "Steps",
};

const stepsItems = [
  { label: "Fred", path: "./fred" },
  { label: "Wilma", path: "./wilma" },
  { label: "Barney", path: "./barney" },
];

export const singleStep = () => {
  return <Steps active="Wilma" items={stepsItems} />;
};
