import { gql } from "@apollo/client";

export const addressLookup: any = gql`
  query addressLookup($postcode: String!) {
    addressLookup(postcode: $postcode) {
      line1
      line2
      line3
      city
      county
      postcode
      latitude
      longitude
    }
  }
`;
