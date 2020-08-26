import { useQuery } from "@apollo/client";
import * as React from "react";
import { createPresignedUploadUrl as createPresignedUploadUrlQuery } from "./queries";
import { UploadViewerProps } from "./types";

export function UploadViewer({ children, id }: UploadViewerProps) {
  const { data = {}, error, loading } = useQuery<any>(
    createPresignedUploadUrlQuery,
    {
      errorPolicy: "all",
      variables: { id },
    }
  );
  const { createPresignedUploadUrl = {} } = data;
  const { presignedUrl: url } = createPresignedUploadUrl;

  // If we have not resolved the image URL,
  // do not render
  if (loading === true) {
    return null;
  }

  return <>{children({ error, url })}</>;
}
