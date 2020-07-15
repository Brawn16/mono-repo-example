import React from "react";
import { stepProps } from "./types";

export function Steps(props: stepProps) {
  const { items, active, onClick } = props;

  return (
    <div>
      <div className="flex border-l-2 rounded-sm border-grey-700">
        {items.map((item) => {
          const { label, path } = item;
          const activeClass = active === label ? "bg-gray-300" : "";
          return (
            <a href={path} onClick={onClick}>
              <div
                key={label}
                className={`p-2 text-gray-700 border-t-2 border-b-2 border-r-2 rounded-sm border-grey-700 ${activeClass}`}
              >
                {label}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
