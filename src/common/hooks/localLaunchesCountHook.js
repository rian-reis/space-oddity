import { useQuery } from "@apollo/client";
import { GET_LAUNCHES } from "../graphql/queries/launch";

export default function useLocalLaunchesCount() {
  const { data } = useQuery(GET_LAUNCHES, {
    variables: { localOnly: true },
    fetchPolicy: "cache-only",
  });

  return data?.launches.length;
}
