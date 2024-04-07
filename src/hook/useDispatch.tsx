import { useContext } from "react";
import { Action, DispatchContext } from "../state/GlobalState";

export const useDispatch = (): React.Dispatch<Action> => {
  const context = useContext(DispatchContext);
  if (context === undefined) {
    throw new Error("useDispatch must be used within a GlobalStateProvider");
  }
  return context;
};
