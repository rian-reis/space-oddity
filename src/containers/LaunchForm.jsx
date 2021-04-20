import { useQuery } from "@apollo/client";
import { LAUNCH_CORE, GET_LAUNCHES } from "../common/graphql/queries/launch";
import { GET_LAUNCHPADS } from "../common/graphql/queries/launchpad";
import { GET_SHIPS } from "../common/graphql/queries/ship";
import client from "../common/graphql/client/apollo";

import { Page, PageHeader } from "../common/components/Page";
import { Row, Col } from "react-flexa";
import { useReducer } from "react";
import { launchFormState, launchFormReducer } from "../common/formState";
import { GET_ROCKETS } from "../common/graphql/queries/rocket";
import QueryResult from "../common/components/QueryResult";

export default function LaunchForm() {
  const { loading, error, data: lastIdData } = useQuery(GET_LAUNCHES, {
    variables: {
      limit: 1,
      offset: 0,
    },
    nextFetchPolicy: "cache-only",
  });

  const {
    loading: loadingLaunchpads,
    error: errorLaunchpads,
    data: launchpadsData,
  } = useQuery(GET_LAUNCHPADS);

  const {
    loading: loadingRockets,
    error: errorRockets,
    data: rocketsData,
  } = useQuery(GET_ROCKETS, {
    variables: { offset: 0 },
  });

  const {
    loading: loadingShips,
    error: errorShips,
    data: shipsData,
  } = useQuery(GET_SHIPS);

  const [formState, dispatch] = useReducer(launchFormReducer, {
    ...launchFormState,
  });

  const inputValue = (value) => (e) =>
    dispatch({
      type: "HANDLE_INPUT",
      field: e.target.name,
      payload: value,
    });

  const selectValue = (value) => (e) =>
    dispatch({
      type: "HANDLE_TOGGLE_OPTION",
      field: e.target.name,
      payload: value,
    });

  const input = (e) => {
    inputValue(e.target.value)(e);
  };

  const reset = () => {
    dispatch({
      type: "HANDLE_RESET",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = `${
      Math.max(lastIdData?.launches.map((el) => Number.parseInt(el.id))) + 1
    }`;

    const selectedLaunchpad = launchpadsData.launchpads.find(
      (lp) => lp.id === formState.launch_site
    );

    const selectedRocket = rocketsData.rockets.find(
      (rck) => rck.id === formState.rocket
    );

    client.cache.modify({
      fields: {
        launches(existingLaunches) {
          const createdLaunch = client.cache.writeFragment({
            fragment: LAUNCH_CORE,
            fragmentName: "LaunchCore",
            data: {
              __typename: "Launch",
              id,
              ...formState,
              launch_site: {
                __typename: "LaunchSite",
                site_id: selectedLaunchpad.id,
                site_name_long: selectedLaunchpad.name,
              },
              ships: !!formState.ships
                ? formState.ships.map((el) => {
                    return {
                      __typename: "Ship",
                      id: el,
                    };
                  })
                : null,
              rocket: {
                __typename: "LaunchRocket",
                rocket_name: selectedRocket.name,
                rocket_type: selectedRocket.type,
              },
            },
          });
          return [...existingLaunches, createdLaunch];
        },
      },
    });

    alert("Lançamento salvo com sucesso");

    reset();
  };

  return (
    <QueryResult
      loading={loading || loadingLaunchpads || loadingShips || loadingRockets}
      error={error || errorLaunchpads || errorShips || errorRockets}
      hasData={true}
    >
      <Page direction="column">
        <PageHeader>
          <Row>
            <Col>
              <h1>Novo Lançamento</h1>
            </Col>
          </Row>
        </PageHeader>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Row>
                <Col>
                  <label htmlFor="mission_name">Nome da Missão</label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <input
                    id="mission_name"
                    name="mission_name"
                    type="text"
                    required
                    value={formState.mission_name}
                    onChange={input}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row>
                <Col>
                  <label htmlFor="launch_date_utc">Data da Missão</label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <input
                    id="launch_date_utc"
                    name="launch_date_utc"
                    type="date"
                    required
                    value={
                      new Date(formState.launch_date_utc)
                        .toISOString("en-US", {
                          timeZone: "America/Sao_Paulo",
                        })
                        .split("T")[0]
                    }
                    onChange={(e) =>
                      inputValue(new Date(e.target.value).toISOString())(e)
                    }
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row>
                <Col>
                  <label htmlFor="launch_site">Plataforma de Lançamento</label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <select
                    id="launch_site"
                    name="launch_site"
                    value={formState.launch_site}
                    required
                    onChange={input}
                  >
                    <option value="" disabled hidden>
                      Escolha
                    </option>
                    {launchpadsData?.launchpads?.map((lp) => {
                      return (
                        <option label={lp.name} value={lp.id} key={lp.id}>
                          {lp.name}
                        </option>
                      );
                    })}
                  </select>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row>
                <Col>
                  <label htmlFor="rocket">Foguete</label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <select
                    id="rocket"
                    name="rocket"
                    required
                    value={formState.rocket}
                    onChange={input}
                  >
                    <option value="" disabled hidden>
                      Escolha
                    </option>
                    {rocketsData?.rockets?.map((rck) => {
                      return (
                        <option label={rck.name} value={rck.id} key={rck.id}>
                          {rck.name}
                        </option>
                      );
                    })}
                  </select>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row>
                <Col>
                  <label htmlFor="ships">Naves</label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <fieldset id="ships" style={{ border: "none" }}>
                    {shipsData?.ships?.map((ship) => {
                      return (
                        <Row key={ship.id}>
                          <input
                            id={ship.id}
                            name="ships"
                            type="checkbox"
                            checked={formState.ships.includes(ship.id)}
                            onChange={(e) =>
                              selectValue({
                                id: ship.id,
                                value: e.target.value,
                              })(e)
                            }
                          />
                          <label htmlFor={ship.id}>{ship.name}</label>
                        </Row>
                      );
                    })}
                  </fieldset>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row>
                <Col>
                  <label htmlFor="details">Detalhes</label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <textarea
                    id="details"
                    name="details"
                    type="text"
                    value={formState.details}
                    onChange={input}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <button type="submit">SALVAR</button>
            </Col>
          </Row>
        </form>
      </Page>
    </QueryResult>
  );
}
