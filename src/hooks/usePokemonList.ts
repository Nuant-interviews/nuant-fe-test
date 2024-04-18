import { api } from '../api';
import { CustomPokemon } from "../models/CustomPokemon";
import { useQuery } from "react-query";

interface UsePokemonListArgs {
  limit?: number;
  offset?: number;
}

const usePokemonList = ({ limit = 50, offset = 0 }: UsePokemonListArgs = {}) => {
  const {data, isLoading, isError} = useQuery(['pokemonList', { limit, offset }], async () => {
    const pokemonResponse = await api.listPokemons(offset, limit);
    const pokemonPromises = pokemonResponse.results.map(async (pokemon) => {
      const pokemonDetails = await api.getPokemonByName(pokemon.name);
      const pokemonData: CustomPokemon = {
        name: pokemonDetails.name,
        id: pokemonDetails.id,
        types: pokemonDetails.types.map((type) => type.type.name),
      };
      return pokemonData;
    });

    return await Promise.all(pokemonPromises);
  });

  return {
    pokemons: data ?? [],
    loading: isLoading,
    error: isError
  }
};

export default usePokemonList;
