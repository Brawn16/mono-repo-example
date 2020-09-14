import React from "react";
import { FileViewer } from "./file-viewer";
import { S3Viewer } from "./s3-viewer";
import { UploadViewerProps } from "./types";

export function UploadViewer({ children, file, id }: UploadViewerProps) {
  if (file) {
    return <FileViewer file={file}>{children}</FileViewer>;
  }

  if (id) {
    return <S3Viewer id={id}>{children}</S3Viewer>;
  }

  return null;
}
