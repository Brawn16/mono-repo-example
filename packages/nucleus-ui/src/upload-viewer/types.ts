import { ApolloError } from "@apollo/client";

export interface UploadViewerProps {
  children: (props: {
    error: ApolloError | undefined;
    url: string | undefined;
  }) => React.ReactNode;
  id: string;
}
