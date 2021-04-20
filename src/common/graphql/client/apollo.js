import { ApolloClient } from "@apollo/client";
// import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist";
import { cache } from "../cache/cache";

// persistCache({
//   cache,
//   storage: new LocalStorageWrapper(window.localStorage),
// })
//   .then(() => {})
//   .catch(() => {});

export default new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});
