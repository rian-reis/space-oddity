import { Fragment, useMemo, useState } from "react";
import { Row, Col } from "react-flexa";

export function ClampableText({ text, clampAt = 140 }) {
  const [clamped, setClamped] = useState(true);

  const result = useMemo(() => {
    return (
      <Fragment>
        {text && (
          <Row onClick={() => setClamped(!clamped)}>
            <Col lg={12} md={12} sm={12} xs={12}>
              {`${text.substring(
                0,
                Math.min(text.length, clamped ? clampAt : Infinity)
              )}${clamped ? "..." : ""}`}
            </Col>
          </Row>
        )}
      </Fragment>
    );
  }, [text, clampAt, clamped]);

  return result;
}
