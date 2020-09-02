import React, { PropsWithChildren } from "react";
import { PanelProps } from "./types";

export function Panel({
  children,
  className = "",
}: PropsWithChildren<PanelProps>) {
  return (
    <div className={`p-4 border border-gray-300 ${className}`}>{children}</div>
  );
}
