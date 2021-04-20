import { useState } from "react";
import { Row, Col } from "react-flexa";
import { Card } from "./Card";

export function Item({ summary, hidden }) {
  const [open, toggleOpen] = useState(false);

  return (
    <Card>
      {summary}
      <Row justifyContent="flex-end">
        <Col>
          <button onClick={() => toggleOpen(!open)}>
            {`
              Mostrar ${open ? "menos" : "mais"}
              `}
          </button>
        </Col>
      </Row>
      <Row justifyContent="space-between" key="details">
        {!!open && hidden}
      </Row>
    </Card>
  );
}
