import { ApolloError } from "@apollo/client";
import { ReactNode } from "react";

export interface UploadViewerData {
  presignedUrl: string;
  upload: {
    contentType: string;
    createdAt: string;
    name: string;
    size: number;
    tags: string[];
    updatedAt: string;
  };
}

export interface UploadViewerChildrenProps {
  error?: ApolloError;
  data?: UploadViewerData;
}

export interface UploadViewerProps {
  children: (props: UploadViewerChildrenProps) => ReactNode;
  id: string;
}
