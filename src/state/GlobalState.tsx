import React, { createContext, useReducer, ReactNode } from "react";
import { initialState, State } from "./initialState";
import { NamedAPIResource } from "pokenode-ts";

export type Action =
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_TYPE"; payload: NamedAPIResource | null };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    case "SET_TYPE":
      return { ...state, type: action.payload };
    default:
      return state;
  }
};

export const GlobalStateContext = createContext<State | undefined>(undefined);
export const DispatchContext = createContext<
  React.Dispatch<Action> | undefined
>(undefined);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};
