import React from "react";
import { BsQuestionCircle } from "react-icons/bs";
import ReactTooltip from "react-tooltip";
import { TooltipProps } from "./types";

export function Tooltip({ message }: TooltipProps) {
  return (
    <div>
      <BsQuestionCircle data-effect="solid" data-tip={message} />
      <ReactTooltip backgroundColor="gray" place="top" textColor="white" />
    </div>
  );
}
