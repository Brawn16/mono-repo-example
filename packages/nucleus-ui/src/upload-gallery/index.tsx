import React, { useContext } from "react";
import { FaTrash } from "react-icons/fa";
import { Label } from "../label";
import { Context } from "../upload-dropzone/context";
import { UploadDropzoneFile } from "../upload-dropzone/types";
import { File } from "./file";

function renderFile(file: UploadDropzoneFile, index: number) {
  let { id: key } = file;
  if (file.file) {
    key = file.file.name;
  }

  return <File key={key} file={file} index={index} />;
}

function renderFiles(files: UploadDropzoneFile[]) {
  return files.map((file, index) => renderFile(file, index));
}

export function UploadGallery() {
  const { files, multiple, onDeleteAll } = useContext(Context);

  // If we have no files, do not render
  if (files.length === 0) {
    return null;
  }

  // Parse label
  let label = "Your Uploaded File";
  if (multiple) {
    label += "s";
  }

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <Label label={label} />
        {multiple && (
          <button
            className="flex items-center hover:text-gray-800 focus:outline-none duration-150 ease-in-out transition"
            onClick={onDeleteAll}
            type="button"
          >
            <FaTrash />
            <span className="pl-1 underline">Remove all</span>
          </button>
        )}
      </div>
      <div className="grid grid-cols-4 gap-4">{renderFiles(files)}</div>
    </div>
  );
}
