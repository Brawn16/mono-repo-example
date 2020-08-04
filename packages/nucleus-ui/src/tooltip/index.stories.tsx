import React from "react";
import { Tooltip } from ".";

export default {
  component: Tooltip,
  title: "Tooltip"
};

export const tooltip = () => {
  return <Tooltip message="Tooltip Message" />;
};
