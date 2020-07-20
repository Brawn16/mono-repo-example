import React from "react";
import { BsQuestionCircle } from "react-icons/bs";
import ReactTooltip from "react-tooltip";
import { tooltipProps } from "./types";

export const Tooltip = ({ message }: tooltipProps) => {
  return (
    <div className="p-10">
      <BsQuestionCircle data-effect="solid" data-tip={message} />
      <ReactTooltip backgroundColor="gray" place="top" textColor="white" />
    </div>
  );
};
