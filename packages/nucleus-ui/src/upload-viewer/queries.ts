import { gql, DocumentNode } from "@apollo/client";

export const createPresignedUploadUrl: DocumentNode = gql`
  query createPresignedUploadUrl($id: String!) {
    createPresignedUploadUrl(id: $id) {
      presignedUrl
    }
  }
`;
