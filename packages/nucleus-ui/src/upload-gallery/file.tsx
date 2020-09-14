import React, { useContext } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { Image } from "../image";
import { Context } from "../upload-dropzone/context";
import { UploadProgress } from "../upload-progress";
import { UploadViewer } from "../upload-viewer";
import { UploadViewerChildrenProps } from "../upload-viewer/types";
import { square } from "./file.module.css";
import { UploadGalleryFileProps } from "./types";

function renderUpload({ error, data }: UploadViewerChildrenProps) {
  if (error !== undefined || data === undefined) {
    return null;
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Image alt="Upload" className="max-h-full" src={data.url} />
    </div>
  );
}

export function File({ file: { file, id }, index }: UploadGalleryFileProps) {
  const { onDelete } = useContext(Context);

  return (
    <div>
      <div className={square}>
        {file && <UploadProgress file={file} />}
        {id && (
          <UploadViewer file={file} id={id}>
            {renderUpload}
          </UploadViewer>
        )}
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
