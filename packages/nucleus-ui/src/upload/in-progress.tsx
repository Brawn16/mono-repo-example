import { useApolloClient } from "@apollo/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTrash, FaRedo } from "react-icons/fa";
import { InputError } from "../input-error";
import { createPresignedUpload as createPresignedUploadMutation } from "./mutations";
import { UploadInProgressProps } from "./types";

export function InProgress({
  file,
  onComplete,
  onDelete,
  tags
}: UploadInProgressProps) {
  const [error, setError] = useState<string>();
  const [progress, setProgress] = useState(1);
  const client = useApolloClient();

  const uploadFile = async () => {
    try {
      const { name, size, type } = file;
      setError(undefined);

      // Create presigned data
      const { data } = await client.mutate({
        errorPolicy: "all",
        mutation: createPresignedUploadMutation,
        variables: {
          data: {
            contentType: type,
            name,
            size,
            tags
          }
        }
      });

      // Parse presigned data
      const { createPresignedUpload: presignedData } = data;
      const { presignedPostUrl, upload } = presignedData;
      const postFields = JSON.parse(presignedData.presignedPostJson);
      const postFieldKeys = Object.keys(postFields);

      // Build form data
      const formData = new FormData();
      postFieldKeys.forEach(key => formData.append(key, postFields[key]));
      formData.append("file", file);

      // Upload file
      await axios.post(presignedPostUrl, formData, {
        onUploadProgress: ({ loaded, total }: ProgressEvent) => {
          setProgress((loaded / total) * 100);
        }
      });

      onComplete(upload.id, file.name);
    } catch (error_) {
      setError(error_.message);
    }
  };

  const handleRetry = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    uploadFile();
  };

  const renderError = (message: string) => (
    <div className="flex justify-between">
      <InputError error={{ message, type: "upload" }} />
      <button
        className="flex items-center mt-1 ml-4"
        onClick={handleRetry}
        type="button"
      >
        <FaRedo className="inline mr-1" />
        Retry
      </button>
    </div>
  );

  useEffect(() => {
    uploadFile();
  }, []);

  return (
    <div className="my-2 text-xs text-gray-500">
      <div className="flex justify-between">
        {file.name}
        <button className="ml-4 text-gray-700" onClick={onDelete} type="button">
          <FaTrash />
        </button>
      </div>
      <div className="h-1 mt-1 bg-gray-100">
        <div className="h-1 bg-blue-500" style={{ width: `${progress}%` }} />
      </div>
      {error && renderError(error)}
    </div>
  );
}
