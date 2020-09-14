import { ApolloError } from "@apollo/client";
import { ReactNode } from "react";

export interface UploadViewerData {
  upload: {
    contentType: string;
    name: string;
    size: number;
  };
  url: string;
}

export interface UploadViewerChildrenProps {
  error?: ApolloError;
  data?: UploadViewerData;
}

export interface UploadViewerFileProps extends UploadViewerProps {
  file: File;
}

export interface UploadViewerProps {
  children: (props: UploadViewerChildrenProps) => ReactNode;
  file?: File;
  id?: string;
}

export interface UploadViewerS3ViewerProps extends UploadViewerProps {
  id: string;
}
