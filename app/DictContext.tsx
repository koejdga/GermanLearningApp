import { createContext } from "react";

export interface DictData {
  wholeDict: {};
  recentlySearched: [];
}

export const DictContext = createContext<DictData>(null);

export const DictProvider = ({ children }) => {
  const wholeDict = require("./whole_dict.json");
  const recentlySearched = require("./last_searches_in_dict.json");

  return (
    <DictContext.Provider value={{ wholeDict, recentlySearched }}>
      {children}
    </DictContext.Provider>
  );
};
