import React, { useContext } from "react";
import { FaTrash } from "react-icons/fa";
import { Context } from "../upload-dropzone/context";
import { UploadProgress } from "../upload-progress";
import { UploadViewer } from "../upload-viewer";
import { UploadViewerChildrenProps } from "../upload-viewer/types";
import { square } from "./file.module.css";
import { UploadGalleryFileProps } from "./types";

function renderUploadDetails({ error, data }: UploadViewerChildrenProps) {
  if (error !== undefined || data === undefined) {
    return null;
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <img alt="Upload" className="max-h-full" src={data.presignedUrl} />
    </div>
  );
}

export function File({ file: { file, id }, index }: UploadGalleryFileProps) {
  const { onDelete } = useContext(Context);

  return (
    <div className={square}>
      {id && <UploadViewer id={id}>{renderUploadDetails}</UploadViewer>}
      {file && <UploadProgress file={file} />}
      <button
        className="absolute bottom-0 right-0 p-2 -mb-4 -mr-4 text-sm text-white bg-blue-600 rounded-full focus:outline-none duration-150 ease-in-out transition hover:bg-blue-500 focus:bg-blue-500"
        onClick={() => onDelete(index)}
        type="button"
      >
        <FaTrash />
      </button>
    </div>
  );
}
