import { gql } from "@apollo/client";

export const createPresignedUpload = gql`
  mutation createPresignedUpload($data: CreatePresignedUploadInput!) {
    createPresignedUpload(data: $data) {
      presignedPostJson
      presignedPostUrl
      upload {
        id
      }
    }
  }
`;
