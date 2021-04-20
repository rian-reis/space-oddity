import { gql } from "@apollo/client";

export const LAUNCHSITE_CORE = gql`
  fragment LaunchSiteCore on LaunchSite {
    site_id
    site_name_long
  }
`;

export const GET_LAUNCHSITES = gql`
  ${LAUNCHSITE_CORE}
  query GetLaunchSites {
    launchsites {
      ...LaunchSiteCore
    }
  }
`;
