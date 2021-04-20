import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import LaunchForm from "../containers/LaunchForm";
import { MockedProvider } from "@apollo/client/testing";
import { mocks } from "../mocks/spacex-data";
import client from "../common/graphql/client/apollo";

it("should submit successfully", async () => {
  const { getByLabelText, getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <LaunchForm client={client} />
    </MockedProvider>
  );
  const missionName = "Major Tom";
  const launchSite = "vafb_slc_3w";

  await screen.findByText(/Novo Lançamento/i);
  window.alert = jest.fn();

  fireEvent.change(getByLabelText(/Nome da Missão/i), {
    target: { value: missionName },
  });
  fireEvent.change(getByLabelText(/Plataforma de Lançamento/i), {
    target: { value: launchSite },
  });
  fireEvent.change(getByLabelText(/Foguete/i), {
    target: { value: missionName },
  });

  fireEvent.click(getByText(/salvar/i));

  expect(window.alert).toBeCalled();
});
