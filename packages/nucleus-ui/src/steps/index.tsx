import React from "react";
import { stepProps, stepObject } from "./types";

export function Steps(props: stepProps) {
  const { items, active, onClick } = props;

  const renderStep = (item: stepObject) => {
    const { label, path, disabled } = item;
    const activeClass = active === label ? "bg-gray-400 " : "";

    if (disabled) {
      return (
        <div key={label}>
          <div className="p-2 text-gray-400 bg-gray-200 border-t-2 border-b-2 border-r-2 rounded-sm border-grey-700">
            {label}
          </div>
        </div>
      );
    }

    return (
      <a key={label} href={path} onClick={onClick}>
        <div
          className={`p-2 text-gray-700  border-t-2 border-b-2 border-r-2 rounded-sm border-grey-700 ${activeClass}`}
        >
          {label}
        </div>
      </a>
    );
  };

  return (
    <div>
      <div className="flex border-l-2 rounded-sm border-grey-700">
        {items.map((item) => {
          return renderStep(item);
        })}
      </div>
    </div>
  );
}
