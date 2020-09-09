import MaterialTooltip from "@material-ui/core/Tooltip";
import React from "react";
import { AiOutlineQuestion } from "react-icons/ai";
import { TooltipProps } from "./types";

export function Tooltip({ message }: TooltipProps) {
  return (
    <MaterialTooltip arrow title={message}>
      <div className="inline-block">
        <AiOutlineQuestion className="w-4 h-4" />
      </div>
    </MaterialTooltip>
  );
}
