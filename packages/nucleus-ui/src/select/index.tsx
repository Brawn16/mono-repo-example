import React, { useRef } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import ReactSelect from "react-select";
import { select } from "./index.module.css";
import { SelectProps } from "./types";

export function Select(props: SelectProps) {
  const { componentRef, error, label, name, required } = props;
  const ref = useRef<HTMLInputElement>(null);

  // Handle select change
  const handleChange = (value: any) => {
    const { current } = ref;
    if (current === null) {
      return;
    }

    const event = new Event("input", { bubbles: true });
    current.value = value.value;
    current.dispatchEvent(event);
  };

  return (
    <>
      {label && (
        <label className="block text-gray-600" htmlFor={name}>
          {label}
          {required && <span className="text-red-600"> *</span>}
        </label>
      )}
      <ReactSelect
        className={select}
        onChange={handleChange}
        {...props}
        name={undefined}
      />
      <input ref={componentRef || ref} name={name} type="hidden" />
      {error && (
        <div className="flex items-center p-1 text-red-600">
          <FaExclamationCircle className="w-3 h-3" />
          <p className="mt-1 mb-1 ml-1 text-xs">{error.message}</p>
        </div>
      )}
    </>
  );
}
