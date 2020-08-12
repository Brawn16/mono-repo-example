import { useQuery } from "@apollo/client";
import * as React from "react";
import { presignedUploadUrl as presignedUploadUrlQuery } from "./queries";
import { UploadViewerProps } from "./types";

export function UploadViewer({ children, id }: UploadViewerProps) {
  const { data = {}, error, loading } = useQuery<any>(presignedUploadUrlQuery, {
    errorPolicy: "all",
    variables: { id }
  });
  const { presignedUploadUrl = {} } = data;
  const { presignedUrl: url } = presignedUploadUrl;

  // If we have not resolved the image URL,
  // do not render
  if (loading === true) {
    return null;
  }

  return <>{children({ error, url })}</>;
}
