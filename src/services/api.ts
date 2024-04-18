import { PokemonClient } from "pokenode-ts";

const client = new PokemonClient();

const getPokemonByName = (pokemonName: string) => client.getPokemonByName(pokemonName);
const listPokemons = () => client.listPokemons();

const api = {
  listPokemons,
  getPokemonByName
}

export default api