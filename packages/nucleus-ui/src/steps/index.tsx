import React from "react";
import {
  leftArrow,
  leftArrowActive,
  rightArrow,
  rightArrowActive
} from "./index.module.css";
import { StepProps, Step } from "./types";

export function Steps(props: StepProps) {
  const { steps, active, onClick } = props;
  const lastIndex = steps.length - 1;

  // Render individual steps
  const rendered = steps.map((item: Step, index: number) => {
    const { disabled, href, label } = item;
    let rightArrowClassName = rightArrow;
    let leftArrowClassName = leftArrow;
    let className = "bg-gray-300";

    if (disabled) {
      return null;
    }

    const handleClick = () => {
      if (onClick) {
        onClick(item);
      }
    };

    if (active === label) {
      rightArrowClassName += ` ${rightArrowActive}`;
      leftArrowClassName += ` ${leftArrowActive}`;
      className = "bg-orange-500 text-white";
    }

    return (
      <a key={href || index} className="mt-2" href={href} onClick={handleClick}>
        <div className="flex">
          {index !== 0 && <div className={leftArrowClassName} />}
          <div
            className={`relative flex flex-col justify-center h-10 px-3 ${className}`}
          >
            {label}
          </div>
          {index !== lastIndex && <div className={rightArrowClassName} />}
        </div>
      </a>
    );
  });

  return (
    <div className="flex flex-wrap -mt-2 text-lg text-gray-600 uppercase">
      {rendered}
    </div>
  );
}
