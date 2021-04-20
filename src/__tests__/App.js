import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { MockedProvider } from "@apollo/client/testing";
import { mocks } from "../mocks/spacex-data";
import { BrowserRouter as Router } from "react-router-dom";

it("should render app", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Router>
        <App />
      </Router>
    </MockedProvider>
  );

  const appName = "Ground Control";

  const appTitle = await screen.findByText(new RegExp(appName, "i"));

  expect(appTitle).toBeInTheDocument();
});
