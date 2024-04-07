import { NamedAPIResource } from "pokenode-ts";

export interface State {
  search: string ;
  type: NamedAPIResource | null;
}

export const initialState: State = {
  search: '',
  type: null,
};
