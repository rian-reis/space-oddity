import { Fragment, useState } from "react";
import { Row, Col } from "react-flexa";

export function List({ list, keys, title }) {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Row onClick={() => setOpen(!open)}>
        <Col>
          {title} {!open && `(${list.length})`}
        </Col>
      </Row>
      {open &&
        list?.map((el, idx) => {
          return (
            <Row justifyContent="space-between" key={idx}>
              {keys.map((key) => {
                return <Col key={el[key]}>{el[key]}</Col>;
              })}
            </Row>
          );
        })}
    </Fragment>
  );
}
