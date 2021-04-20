import React, { useState, createContext } from "react";

export const FiltersContext = createContext();

export const FiltersContextProvider = (props) => {
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("");

  return (
    <FiltersContext.Provider value={{ filter, setFilter, limit, setLimit }}>
      {props.children}
    </FiltersContext.Provider>
  );
};
