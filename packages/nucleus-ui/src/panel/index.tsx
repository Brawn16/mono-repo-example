import React, { PropsWithChildren } from "react";
import { panel } from "./index.module.css";
import { PanelProps } from "./types";

export function Panel({
  children,
  className = "",
}: PropsWithChildren<PanelProps>) {
  return (
    <div className={`${panel} ${className}`}>
      <div className="p-4 border border-t-0 border-gray-300 rounded-b">
        {children}
      </div>
    </div>
  );
}
