import { useApolloClient } from "@apollo/client";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Context } from "../upload-dropzone/context";
import {
  circularProgressBack,
  circularProgressFront,
} from "./index.module.css";
import { createPresignedUpload as createPresignedUploadMutation } from "./mutations";
import { UploadProgressProps } from "./types";

export function UploadProgress({ file }: UploadProgressProps) {
  const { onUploadComplete, tags } = useContext(Context);
  const [progress, setProgress] = useState(1);
  const client = useApolloClient();

  const uploadFile = async () => {
    try {
      const { name, size, type } = file;
      const { data } = await client.mutate({
        errorPolicy: "all",
        mutation: createPresignedUploadMutation,
        variables: {
          data: {
            contentType: type,
            name,
            size,
            tags,
          },
        },
      });

      // Parse presigned data
      const { createPresignedUpload: presignedData } = data;
      const { presignedPostUrl, upload } = presignedData;
      const postFields = JSON.parse(presignedData.presignedPostJson);
      const postFieldKeys = Object.keys(postFields);

      // Build form data
      const formData = new FormData();
      postFieldKeys.forEach((key) => formData.append(key, postFields[key]));
      formData.append("file", file);

      // Upload file
      await axios.post(presignedPostUrl, formData, {
        onUploadProgress: ({ loaded, total }: ProgressEvent) => {
          setProgress(Math.round((loaded / total) * 100));
        },
      });

      onUploadComplete(file, upload.id);
    } catch (error_) {
      //
    }
  };

  useEffect(() => {
    uploadFile();
  }, []);

  return (
    <>
      <div className="absolute inset-0 flex items-center justify-center">
        <CircularProgress
          className={circularProgressBack}
          size={64}
          thickness={4}
          value={100}
          variant="static"
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <CircularProgress
          className={circularProgressFront}
          size={64}
          thickness={4}
          value={progress}
          variant="static"
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center text-sm">
        {progress}%
      </div>
    </>
  );
}
