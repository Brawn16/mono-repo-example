import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { UploadUploadedProps } from "./types";

export function Uploaded({ name, onDelete }: UploadUploadedProps) {
  const [fileName] = useState(name);

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
