import React, { PropsWithChildren } from "react";
import { AiOutlineWarning } from "react-icons/ai";
import { AlertProps } from "./types";

export function Alert({
  children,
  className = "text-white bg-red-600",
  iconType: Icon = AiOutlineWarning,
}: PropsWithChildren<AlertProps>) {
  return (
    <div className={`p-4  ${className}`}>
      <div className="flex">
        {Icon && (
          <div className="flex-shrink-0 pr-2">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
