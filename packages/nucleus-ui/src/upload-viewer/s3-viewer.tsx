import { useQuery } from "@apollo/client";
import React, { ReactElement } from "react";
import { createPresignedUploadUrl as createPresignedUploadUrlQuery } from "./queries";
import { UploadViewerS3ViewerProps, UploadViewerData } from "./types";

export function S3Viewer({
  children,
  id,
  loadingChildren = null,
}: UploadViewerS3ViewerProps): ReactElement | null {
  const { data, error, loading } = useQuery<{
    createPresignedUploadUrl?: UploadViewerData;
  }>(createPresignedUploadUrlQuery, {
    errorPolicy: "all",
    fetchPolicy: "no-cache",
    variables: { id },
  });

  // If we have not resolved the image URL,
  // do not render
  if (loading === true) {
    return loadingChildren;
  }

  const { createPresignedUploadUrl } = data || {};
  return <>{children({ error, data: createPresignedUploadUrl })}</>;
}
