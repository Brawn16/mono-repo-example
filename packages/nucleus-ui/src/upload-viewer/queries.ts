import { gql, DocumentNode } from "@apollo/client";

export const createPresignedUploadUrl: DocumentNode = gql`
  query createPresignedUploadUrl($id: String!) {
    presignedUploadUrl(id: $id) {
      presignedUrl
    }
  }
`;
