import { useContext } from "react";
import { GlobalStateContext } from "../state/GlobalState";
import { State } from "../state/initialState";

export const useGlobalState = (): State => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};
