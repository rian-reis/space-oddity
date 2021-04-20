import { gql } from "@apollo/client";

export const GET_LAUNCHPADS = gql`
  query GetLaunchpads {
    launchpads {
      id
      name
    }
  }
`;
