import axios from 'axios'
import { PokemonClient } from "pokenode-ts";

const pokemonApi = new PokemonClient();

export const httpClient = axios.create()

export default pokemonApi;