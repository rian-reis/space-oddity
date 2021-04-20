import { LaunchItem } from "./LaunchItem";
import { CardList } from "./Card";

export default function LaunchList({ launches, excluir }) {
  return (
    <CardList>
      {launches?.map((launch) => {
        return (
          <LaunchItem
            launch={launch}
            key={`${launch.id}-${launch.launch_date_utc}`}
            excluir={excluir(launch)}
          />
        );
      })}
    </CardList>
  );
}
