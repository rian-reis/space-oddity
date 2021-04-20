import { Page, PageHeader } from "../common/components/Page";
import { ListPageHeader } from "../common/components/ListPageHeader";

import LaunchListSearch from "./LaunchListSearch";

export default function LaunchListPage({ title, localOnly, children }) {
  return (
    <Page direction="column">
      <PageHeader>
        <ListPageHeader children={children} title={title}></ListPageHeader>
      </PageHeader>
      <LaunchListSearch localOnly={localOnly} />;
    </Page>
  );
}
