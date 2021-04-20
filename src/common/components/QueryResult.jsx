import { Page } from "./Page";

export default function QueryResult({ loading, error, hasData, children }) {
  if (loading) return <Page center>Loading...</Page>;
  if (error) return <Page center>{`Error! ${error.message}`}</Page>;
  if (!hasData) return <Page center>{`No Results`}</Page>;
  return children;
}
