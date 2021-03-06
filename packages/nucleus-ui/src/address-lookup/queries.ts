import { gql } from "@apollo/client";

export const addressLookup = gql`
  query addressLookup($postcode: String!) {
    addressLookup(postcode: $postcode) {
      line1
      line2
      line3
      townCity
      county
      postcode
      latitude
      longitude
    }
  }
`;
