import { useQuery } from "@apollo/client";
import * as React from "react";
import { createPresignedUploadUrl as createPresignedUploadUrlQuery } from "./queries";
import { UploadViewerS3ViewerProps, UploadViewerData } from "./types";

export function S3Viewer({ children, id }: UploadViewerS3ViewerProps) {
  const { data, error, loading } = useQuery<{
    createPresignedUploadUrl?: UploadViewerData;
  }>(createPresignedUploadUrlQuery, {
    errorPolicy: "all",
    fetchPolicy: "no-cache",
    variables: { id },
  });

  console.log("here");

  // If we have not resolved the image URL,
  // do not render
  if (loading === true) {
    return null;
  }

  const { createPresignedUploadUrl } = data || {};
  return <>{children({ error, data: createPresignedUploadUrl })}</>;
}
