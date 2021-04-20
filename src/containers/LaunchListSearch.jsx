import QueryResult from "../common/components/QueryResult";
import { useQuery } from "@apollo/client";
import { GET_LAUNCHES } from "../common/graphql/queries/launch";
import { useContext } from "react";
import { FiltersContext } from "../common/contexts/FiltersContext";
import LaunchList from "../common/components/LaunchList";
import client from "../common/graphql/client/apollo";

export default function LaunchListSearch({ localOnly }) {
  const { filter, limit } = useContext(FiltersContext);

  const { loading, error, data } = useQuery(GET_LAUNCHES, {
    variables: { offset: 0, limit, name: filter, localOnly },
  });
  const excluir = (launch) => () => {
    client.cache.modify({
      fields: {
        launches(existingLaunches) {
          return existingLaunches.filter((el) => {
            return el.__ref !== client.cache.identify(launch);
          });
        },
      },
    });
  };
  return (
    <QueryResult
      loading={loading}
      error={error}
      hasData={data?.launches?.length > 0}
    >
      <LaunchList launches={data?.launches} excluir={excluir} />;
    </QueryResult>
  );
}
