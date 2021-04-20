import { GET_LAUNCHES } from "../common/graphql/queries/launch";
import { GET_ROCKETS } from "../common/graphql/queries/rocket";
import { GET_LAUNCHPADS } from "../common/graphql/queries/launchpad";
import { GET_SHIPS } from "../common/graphql/queries/ship";

export const LAUNCH_MOCK = {
  __typename: "Launch",
  id: "1",
  launch_date_utc: "2014-01-06T18:06:00.000Z",
  launch_site: {
    site_id: "ccafs_slc_40",
    site_name_long: "Cape Canaveral Air Force Station Space Launch Complex 40",
  },
  mission_name: "Thaicom 6",
  details:
    'Second GTO launch for Falcon 9. The USAF evaluated launch data from this flight as part of a separate certification program for SpaceX to qualify to fly U.S. military payloads and found that the Thaicom 6 launch had "unacceptable fuel reserves at engine cutoff of the stage 2 second burnoff"',
  rocket: {
    rocket_name: "Falcon 9",
  },
  ships: [
    {
      id: "AMERICANISLANDER",
      name: "American Islander",
      type: "Cargo",
    },
  ],
  isLocal: true,
};

export const ROCKET_MOCK = {
  __typename: "Rocket",
  id: "falcon1",
  name: "Falcon 1",
  stages: 2,
  active: false,
  height: {
    meters: 22.25,
  },
  diameter: {
    meters: 1.68,
  },
  payload_weights: [
    {
      name: "Low Earth Orbit",
      kg: 450,
      id: "leo",
    },
  ],
  description:
    "The Falcon 1 was an expendable launch system privately developed and manufactured by SpaceX during 2006-2009. On 28 September 2008, Falcon 1 became the first privately-developed liquid-fuel launch vehicle to go into orbit around the Earth.",
  engines: {
    type: "merlin",
    number: 1,
  },
};

export const LAUNCHPAD_MOCK = {
  id: "vafb_slc_3w",
  name: "Vandenberg Air Force Base Space Launch Complex 3W",
};

export const SHIP_MOCK = {
  __typename: "Ship",
  id: "GOMSTREE",
  name: "GO Ms Tree",
  type: "High Speed Craft",
};

export const mocks = [
  {
    request: {
      query: GET_LAUNCHES,
      variables: { limit: 10, offset: 0, name: "" },
    },
    result: {
      data: {
        launches: [{ ...LAUNCH_MOCK }],
      },
    },
  },
  {
    request: {
      query: GET_LAUNCHES,
      variables: { limit: 10, offset: 0, name: "", localOnly: undefined },
    },
    result: {
      data: {
        launches: [{ ...LAUNCH_MOCK }],
      },
    },
  },
  {
    request: {
      query: GET_LAUNCHES,
      variables: { limit: 1, offset: 0 },
    },
    result: {
      data: {
        launches: [{ ...LAUNCH_MOCK }],
      },
    },
  },
  {
    request: {
      query: GET_ROCKETS,
      variables: { limit: 10, offset: 0, filter: "" },
    },
    result: {
      data: {
        rockets: [{ ...ROCKET_MOCK }],
      },
    },
  },
  {
    request: {
      query: GET_LAUNCHPADS,
    },
    result: {
      data: {
        launchpads: [{ ...LAUNCHPAD_MOCK }],
      },
    },
  },
  {
    request: {
      query: GET_ROCKETS,
      variables: { offset: 0 },
    },
    result: {
      data: {
        rockets: [{ ...ROCKET_MOCK }],
      },
    },
  },
  {
    request: {
      query: GET_SHIPS,
    },
    result: {
      data: {
        ships: [{ ...SHIP_MOCK }],
      },
    },
  },
];
