import { gql } from "@apollo/client";

export const createPresignedUploadUrl = gql`
  query createPresignedUploadUrl($id: String!) {
    createPresignedUploadUrl(id: $id) {
      upload {
        contentType
        name
        size
      }
      url
    }
  }
`;
