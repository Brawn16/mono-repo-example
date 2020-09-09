import React, { useContext } from "react";
import { AiOutlineDelete } from "react-icons/ai";
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
    <div>
      <div className={square}>
        {id && <UploadViewer id={id}>{renderUploadDetails}</UploadViewer>}
        {file && <UploadProgress file={file} />}
      </div>
      <button
        className="flex items-center mt-1 text-sm hover:text-gray-800 focus:outline-none duration-150 ease-in-out transition"
        onClick={() => onDelete(index)}
        type="button"
      >
        <AiOutlineDelete />
        <span className="pl-1 underline">Remove file</span>
      </button>
    </div>
  );
}
