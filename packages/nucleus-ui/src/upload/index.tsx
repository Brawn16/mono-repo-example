import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Button } from "../button";
import { InputError } from "../input-error";
import { Label } from "../label";
import { InProgress } from "./in-progress";
import { UploadProps } from "./types";
import { Uploaded } from "./uploaded";

export function Upload(props: UploadProps) {
  const [fileNames, setFileNames] = useState<{ [id: string]: string }>({});
  const [inProgress, setInProgress] = useState<File[]>([]);
  const [uploaded, setUploaded] = useState<string[]>([]);
  const {
    buttonEntity = "file",
    error,
    label,
    multiple,
    onChange,
    required,
    tags,
  } = props;

  useEffect(() => {
    onChange(uploaded);
  }, [uploaded]);

  const onDrop = async (files: File[]) => {
    setInProgress([...(inProgress || []), ...files]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    onDrop,
    ...props,
  });

  // Render button
  let button;
  if (multiple || (inProgress.length === 0 && uploaded.length === 0)) {
    let buttonLabel = `Choose ${buttonEntity}`;
    if (isDragActive) {
      buttonLabel = "Drop here...";
    } else if (multiple) {
      buttonLabel = `Choose ${buttonEntity}s`;
    }

    button = (
      <div {...getRootProps()}>
        <Button
          className="w-48 mt-2 text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-700"
          type="button"
        >
          <span>
            <FaCloudUploadAlt className="w-8 h-8 mx-auto mb-1 opacity-75" />
            {buttonLabel}
          </span>
        </Button>
      </div>
    );
  }

  // Render in progress files
  const inProgressFiles = inProgress.map((file) => {
    const handleDelete = () => {
      setInProgress((inProgressState) => {
        const index = inProgressState.findIndex(
          (inProgressFile) => inProgressFile === file
        );

        const updated = [...inProgressState];
        updated.splice(index, 1);
        return updated;
      });
    };

    const handleComplete = (id: string, fileName: string) => {
      setFileNames((fileNamesState) => ({ ...fileNamesState, [id]: fileName }));
      setUploaded((uploadedState) => [...uploadedState, id]);
      handleDelete();
    };

    return (
      <InProgress
        key={file.name}
        file={file}
        onComplete={handleComplete}
        onDelete={handleDelete}
        tags={tags}
      />
    );
  });

  // Render uploaded files
  const uploadedFiles = uploaded.map((id, index) => {
    const handleDelete = () => {
      const updated = [...uploaded];
      updated.splice(index, 1);
      setUploaded(updated);
    };

    return (
      <Uploaded key={id} id={id} name={fileNames[id]} onDelete={handleDelete} />
    );
  });

  return (
    <>
      {label && <Label label={label} required={required} />}
      <input {...getInputProps()} />
      {uploadedFiles}
      {inProgressFiles}
      {button}
      {error && <InputError error={error} />}
    </>
  );
}
