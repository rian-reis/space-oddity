import { RocketItem } from "./RocketItem";
import { CardList } from "./Card";

export default function RocketList({ rockets }) {
  return (
    <CardList>
      {rockets?.map((rocket) => {
        return <RocketItem rocket={rocket} key={rocket.id} />;
      })}
    </CardList>
  );
}
