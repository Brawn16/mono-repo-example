import { useQuery } from "@apollo/client";
import * as React from "react";
import { createPresignedUploadUrl as createPresignedUploadUrlQuery } from "./queries";
import { UploadViewerProps, UploadViewerData } from "./types";

export function UploadViewer({ children, id }: UploadViewerProps) {
  const { data, error, loading } = useQuery<{
    createPresignedUploadUrl?: UploadViewerData;
  }>(createPresignedUploadUrlQuery, {
    errorPolicy: "all",
    variables: { id },
  });
  const { createPresignedUploadUrl } = data || {};

  // If we have not resolved the image URL,
  // do not render
  if (loading === true) {
    return null;
  }

  return <>{children({ error, data: createPresignedUploadUrl })}</>;
}
