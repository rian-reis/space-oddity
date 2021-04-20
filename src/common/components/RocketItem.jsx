import { List } from "./List";
import { Row, Col } from "react-flexa";
import { Fragment } from "react";
import { ClampableText } from "./ClampableText";
import { Item } from "./Item";

export function RocketItem({ rocket }) {
  return (
    <Item
      summary={
        <Fragment>
          <Row justifyContent="space-between">
            <Col>{rocket.name}</Col>
            <Col>{rocket.active ? "Ativo" : "Inativo"}</Col>
          </Row>
          <Row>
            <Col>{rocket.stages + " estágios"}</Col>
          </Row>
          <Row justifyContent="space-between">
            <Col>{rocket.height.meters + " metros de altura"}</Col>
            <Col>{rocket.diameter.meters + " metros de diâmetro"}</Col>
          </Row>
          <List
            list={rocket.payload_weights}
            keys={["name", "kg"]}
            title="Cargas"
          ></List>
        </Fragment>
      }
      hidden={
        <Fragment>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Row>
              <Col>Motor</Col>
            </Row>
            <Row>
              <Col>
                {`#${
                  rocket.engines.number
                } - ${rocket.engines.type.toUpperCase()}`}
              </Col>
            </Row>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <ClampableText text={rocket.description} />
          </Col>
        </Fragment>
      }
    ></Item>
  );
}
