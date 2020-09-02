import { gql } from "@apollo/client";

export const createPresignedUploadUrl = gql`
  query createPresignedUploadUrl($id: String!) {
    createPresignedUploadUrl(id: $id) {
      presignedUrl
      upload {
        contentType
        createdAt
        name
        size
        tags
        updatedAt
      }
    }
  }
`;
