import { createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface DictData {
  wholeDict: {};
}

export const storeRecentlySearchedWords = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("recentlySearched", jsonValue);
  } catch (e) {
    console.log(
      "ERROR: unable to store recently searched words in async storage"
    );
    console.log(e);
  }
};

export const getRecentlySearchedWords = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("recentlySearched");
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.log(
      "ERROR: unable to get recently searched words from async storage"
    );
    console.log(e);
  }
};

export const DictContext = createContext<DictData>(null);

export const DictProvider = ({ children }) => {
  const wholeDict = require("./whole_dict.json");

  return (
    <DictContext.Provider value={{ wholeDict }}>
      {children}
    </DictContext.Provider>
  );
};
