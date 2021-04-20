import { gql } from "@apollo/client";

export const SHIP_FRAGMENT = gql`
  fragment ShipFragment on Ship {
    id
    name
    type
  }
`;

export const GET_SHIPS = gql`
  ${SHIP_FRAGMENT}
  query GetShips {
    ships {
      ...ShipFragment
    }
  }
`;
