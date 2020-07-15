import React from "react";
import { Tooltip } from ".";

export default {
  component: Tooltip,
  title: "tooltip",
};

export const tooltip = () => {
  return (
    <>
      <Tooltip message="tooltip message" />
    </>
  );
};
