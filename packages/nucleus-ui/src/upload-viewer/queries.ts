import { gql } from "@apollo/client";

export const presignedUploadUrl: any = gql`
  query presignedUploadUrl($id: String!) {
    presignedUploadUrl(id: $id) {
      presignedUrl
    }
  }
`;
