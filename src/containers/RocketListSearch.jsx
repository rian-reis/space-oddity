import QueryResult from "../common/components/QueryResult";

import { useQuery } from "@apollo/client";
import { GET_ROCKETS } from "../common/graphql/queries/rocket";
import { useContext } from "react";
import { FiltersContext } from "../common/contexts/FiltersContext";
import RocketList from "../common/components/RocketList";

export default function RocketListSearch() {
  const { filter, limit } = useContext(FiltersContext);

  const { loading, error, data } = useQuery(GET_ROCKETS, {
    variables: { offset: 0, limit, filter: filter },
  });

  return (
    <QueryResult
      loading={loading}
      error={error}
      hasData={data?.rockets?.length > 0}
    >
      <RocketList rockets={data?.rockets} />
    </QueryResult>
  );
}
