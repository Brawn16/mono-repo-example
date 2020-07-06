import React from "react";
import { PanelProps } from "./types";

export function Panel({
  children,
  className = "",
  subtitle,
  title,
  titleClassName = "",
}: React.PropsWithChildren<PanelProps>): React.ReactElement {
  return (
    <div className={`bg-white shadow md:rounded-md ${className}`}>
      {title && (
        <div className={`p-8 ${titleClassName}`}>
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-gray-600">{subtitle}</p>
        </div>
      )}
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}
