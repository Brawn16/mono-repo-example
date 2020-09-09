import React, { useContext } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { Label } from "../label";
import { Context } from "../upload-dropzone/context";
import { UploadDropzoneFile } from "../upload-dropzone/types";
import { File } from "./file";
import { UploadGalleryProps } from "./types";

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

export function UploadGallery({
  className = "mt-4",
  gridClassName = "grid grid-cols-2 md:grid-cols-4 gap-4",
  hideHeader,
}: UploadGalleryProps) {
  const { files, fileLabel, multiple, onDeleteAll } = useContext(Context);

  // If we have no files, do not render
  if (files.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      {hideHeader !== true && (
        <div className="flex items-center justify-between">
          <Label label={`Your uploaded ${fileLabel}`} />
          {multiple && (
            <button
              className="flex items-center hover:text-gray-800 focus:outline-none duration-150 ease-in-out transition"
              onClick={onDeleteAll}
              type="button"
            >
              <AiOutlineDelete />
              <span className="pl-1 underline">Remove all</span>
            </button>
          )}
        </div>
      )}
      <div className={gridClassName}>{renderFiles(files)}</div>
    </div>
  );
}
