import React, { PropsWithChildren, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { AccordionProps } from "./types";

export function Accordion(props: PropsWithChildren<AccordionProps>) {
  const { children, headerChildren, title, isOpen = false } = props;
  const [open, setOpen] = useState(isOpen);
  let className = "duration-300 ease-in-out transition";

  if (open) {
    className += " transform rotate-180";
  }

  const handleClick = () => {
    setOpen(open === false);
  };

  return (
    <div className="p-4 border border-gray-200">
      <button
        className="flex items-center w-full focus:outline-none"
        onClick={handleClick}
        type="button"
      >
        <h3 className="flex-1 text-lg text-left text-gray-600">{title}</h3>
        {headerChildren}
        <FaChevronDown className={className} />
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}
