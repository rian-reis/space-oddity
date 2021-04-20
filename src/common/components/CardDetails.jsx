import { Fragment } from "react";
import { Col } from "react-flexa";
import { List } from "./List";
import { ClampableText } from "./ClampableText";

export function CardDetails({ description, list, keys, title }) {
  return (
    <Fragment>
      <Col lg={6} md={6} sm={12} xs={12}>
        <List list={list} keys={keys} title={title}></List>
      </Col>
      <Col lg={6} md={6} sm={12} xs={12}>
        <ClampableText text={description} />
      </Col>
    </Fragment>
  );
}
