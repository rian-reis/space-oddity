import { Fragment, useContext, useLayoutEffect } from "react";
import { Row, Col } from "react-flexa";
import { useState } from "react";
import useDebounce from "../hooks/debounceHook";
import { Input } from "./Input";
import { FiltersContext } from "../contexts/FiltersContext";

export function ListPageHeader({ title, children }) {
  const { filter, setFilter, limit, setLimit } = useContext(FiltersContext);
  const [localFilter, setLocalFilter] = useState(filter);
  const debouncedFilter = useDebounce(localFilter, 500);

  useLayoutEffect(() => {
    setFilter(debouncedFilter);
  }, [setFilter, debouncedFilter]);

  return (
    <Fragment>
      <Row>
        <Col>
          <h1>{title}</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Input
            type="text"
            value={localFilter}
            onChange={(e) => setLocalFilter(e.target.value)}
            placeholder="Filtrar por nome"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <select
            value={limit || ""}
            onChange={(e) => {
              const limit =
                e.target.value === "" ? null : Number.parseInt(e.target.value);
              setLimit(limit || null);
            }}
          >
            {[10, 25, 50, null].map((opt) => {
              return (
                <option
                  label={opt || "Todos"}
                  value={opt || ""}
                  key={opt || "all"}
                >
                  {opt || "Todos"}
                </option>
              );
            })}
          </select>
          {` ${limit ? "ultimos" : "os"} resultados`}
        </Col>
      </Row>
      {children}
    </Fragment>
  );
}
