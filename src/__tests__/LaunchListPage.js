import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import LaunchListPage from "../containers/LaunchListPage";
import { FiltersContextProvider } from "../common/contexts/FiltersContext";
import { mocks, LAUNCH_MOCK } from "../mocks/spacex-data";
import client from "../common/graphql/client/apollo";

test("render launch list page", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <FiltersContextProvider>
        <LaunchListPage client={client} />
      </FiltersContextProvider>
    </MockedProvider>
  );

  const launchName = new RegExp(LAUNCH_MOCK.mission_name, "i");

  const launchCard = await screen.findByText(launchName);
  expect(launchCard).toBeInTheDocument();
});
