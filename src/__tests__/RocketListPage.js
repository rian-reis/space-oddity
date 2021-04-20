import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import RocketListPage from "../containers/RocketListPage";
import { FiltersContextProvider } from "../common/contexts/FiltersContext";
import { mocks, ROCKET_MOCK } from "../mocks/spacex-data";

test("render rocket list page", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <FiltersContextProvider>
        <RocketListPage />
      </FiltersContextProvider>
    </MockedProvider>
  );

  const rocketName = new RegExp(ROCKET_MOCK.name, "i");

  const rocketCard = await screen.findByText(rocketName);
  expect(rocketCard).toBeInTheDocument();
});
