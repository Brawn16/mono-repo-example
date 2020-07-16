import React from "react";
import { stepProps, stepItem } from "./types";

export function Steps(props: stepProps) {
  const { items, active, onClick } = props;

  const handleClick = (item: stepItem) => {
    if (onClick) {
      onClick(item);
    }
  };

  const renderSteps = (stepItems: stepItem[]) => {
    return stepItems.map((item: stepItem) => {
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
        <a key={label} href={path} onClick={() => handleClick(item)}>
          <div
            className={`p-2 text-gray-700  border-t-2 border-b-2 border-r-2 rounded-sm border-grey-700 ${activeClass}`}
          >
            {label}
          </div>
        </a>
      );
    });
  };

  return (
    <div>
      <div className="flex border-l-2 rounded-sm border-grey-700">
        {renderSteps(items)}
      </div>
    </div>
  );
}
