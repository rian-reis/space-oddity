import { CardDetails } from "./CardDetails";
import { Row, Col } from "react-flexa";
import { Item } from "./Item";
import { Fragment } from "react";

export function LaunchItem({ launch, excluir }) {
  return (
    <Item
      summary={
        <Fragment>
          <Row justifyContent="space-between">
            <Col>{`Missão ${launch.mission_name}`}</Col>
            <Col>
              {!!launch.isLocal && (
                <button type="button" onClick={excluir}>
                  Excluir
                </button>
              )}
            </Col>
          </Row>
          <Row justifyContent="space-between">
            <Col>{new Date(launch.launch_date_utc).toLocaleString()}</Col>
            <Col sm={12} xs={12}>
              {launch.launch_site.site_name_long}
            </Col>
          </Row>
        </Fragment>
      }
      hidden={
        <Fragment>
          <CardDetails
            description={launch.details}
            list={launch.ships}
            keys={["name", "type"]}
            title="Naves"
          />
        </Fragment>
      }
    ></Item>
  );
}
