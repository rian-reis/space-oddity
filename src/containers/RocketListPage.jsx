import { Page, PageHeader } from "../common/components/Page";
import { ListPageHeader } from "../common/components/ListPageHeader";

import RocketListSearch from "./RocketListSearch";

export default function RocketListPage({ title }) {
  return (
    <Page direction="column">
      <PageHeader>
        <ListPageHeader title={title}></ListPageHeader>
      </PageHeader>
      <RocketListSearch />
    </Page>
  );
}
