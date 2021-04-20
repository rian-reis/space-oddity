import { gql } from "@apollo/client";
import { LAUNCHSITE_CORE } from "./launchsite";
import { SHIP_FRAGMENT } from "./ship";

export const LAUNCH_CORE = gql`
  ${LAUNCHSITE_CORE}
  ${SHIP_FRAGMENT}
  fragment LaunchCore on Launch {
    id
    launch_date_utc
    launch_site {
      ...LaunchSiteCore
    }
    mission_name
    details
    rocket {
      rocket_name
    }
    ships {
      ...ShipFragment
    }
    isLocal @client
  }
`;

export const GET_LAUNCHES = gql`
  ${LAUNCH_CORE}
  query GetLaunches($limit: Int, $offset: Int!, $name: String) {
    launches(
      order: "DESC"
      sort: "launch_date_utc"
      limit: $limit
      offset: $offset
      find: { mission_name: $name }
    ) {
      ...LaunchCore
    }
  }
`;
