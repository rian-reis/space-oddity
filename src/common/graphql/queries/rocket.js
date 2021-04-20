import { gql } from "@apollo/client";

export const GET_ROCKETS_DETAILED = gql`
  fragment RocketDetails on Rocket {
    description
    engines {
      type
      number
    }
  }
`;

export const GET_ROCKETS = gql`
  ${GET_ROCKETS_DETAILED}
  query GetRockets($limit: Int, $offset: Int!) {
    rockets(limit: $limit, offset: $offset) {
      id
      name
      stages
      active
      height {
        meters
      }
      diameter {
        meters
      }
      payload_weights {
        name
        kg
        id
      }
      ...RocketDetails
    }
  }
`;
