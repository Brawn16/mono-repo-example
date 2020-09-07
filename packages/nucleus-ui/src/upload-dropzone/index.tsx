import React, { PropsWithChildren, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";
import { PrimaryButton } from "../button";
import { InputError } from "../input-error";
import { Label } from "../label";
import { Context } from "./context";
import { UploadDropzoneProps, UploadDropzoneFile } from "./types";

export function UploadDropzone(props: PropsWithChildren<UploadDropzoneProps>) {
  const {
    children,
    error,
    label,
    multiple,
    onChange,
    required,
    tags,
    uploads = [],
  } = props;
  const [files, setFiles] = useState<UploadDropzoneFile[]>(
    uploads.map((id) => ({ id }))
  );

  // Build file label
  let { fileLabel = "file" } = props;
  if (multiple) {
    fileLabel += "s";
  }

  // Build error classes
  let errorClassName = "";
  if (error) {
    errorClassName = "border-red-600 focus:border-red-600";
  }

  const handleChange = (newFiles: UploadDropzoneFile[]) => {
    onChange(
      newFiles
        .filter(({ id }) => id !== undefined)
        .map(({ id }) => id as string)
    );
  };

  const handleDelete = (index: number) => {
    const newFiles = [...files];

    newFiles.splice(index, 1);
    setFiles(newFiles);
    handleChange(newFiles);
  };

  const handleDeleteAll = () => {
    setFiles([]);
    handleChange([]);
  };

  const handleDrop = async (droppedFiles: File[]) => {
    const newFiles = droppedFiles.map((file) => ({ file }));
    setFiles([...files, ...newFiles]);
  };

  const handleUploadComplete = (uploadedFile: File, id: string) => {
    const index = files.findIndex(({ file }) => file === uploadedFile);
    const newFiles = [...files];

    newFiles[index] = { id };
    setFiles(newFiles);
    handleChange(newFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: handleDrop,
    ...props,
  });

  // Wrap children in context provider so any elements
  // can access upload files and common methods
  const renderedChildren = (
    <Context.Provider
      value={{
        files,
        fileLabel,
        multiple,
        onDelete: handleDelete,
        onDeleteAll: handleDeleteAll,
        onUploadComplete: handleUploadComplete,
        tags,
      }}
    >
      {children}
    </Context.Provider>
  );

  // If we are not uploading multiple files and we already
  // have an upload, render children only
  if (multiple !== true && files.length !== 0) {
    return renderedChildren;
  }

  return (
    <>
      {label && <Label label={label} required={required} />}
      <input {...getInputProps()} />
      <div
        {...getRootProps()}
        className={`flex flex-col items-center p-6 bg-gray-100 border-2 border-dashed rounded cursor-pointer focus:outline-none focus:border-gray-400 focus:bg-gray-200 ${errorClassName}`}
      >
        <FaCloudUploadAlt className="text-6xl text-gray-400" />
        <div className="pb-4">
          Drag {multiple ? "files" : "file"} to upload, or
        </div>
        <PrimaryButton>Choose {fileLabel}</PrimaryButton>
      </div>
      {error && <InputError error={error} />}
      {renderedChildren}
    </>
  );
}
