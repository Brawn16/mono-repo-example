import { capitalCase } from "change-case";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { UploadUploadedProps } from "./types";

export function Uploaded({
  buttonEntity,
  index,
  name,
  onDelete,
}: UploadUploadedProps) {
  const fileName = name || `${capitalCase(buttonEntity)} ${index + 1}`;

  return (
    <div className="my-2 text-xs text-gray-500">
      <div className="flex justify-between">
        <span>{fileName}</span>
        <button className="ml-4 text-gray-700" onClick={onDelete} type="button">
          <FaTrash />
        </button>
      </div>
    </div>
  );
}
