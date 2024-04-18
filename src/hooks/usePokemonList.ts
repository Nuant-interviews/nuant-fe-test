import { useEffect, useState } from 'react';
import { api } from '../api';

interface UsePokemonListArgs {
  limit?: number;
  offset?: number;
}

interface CustomPokemon {
  id: number
  name: string
  types: string[]
}

const usePokemonList = ({ limit = 50, offset = 0 }: UsePokemonListArgs = {}) => {
  const [pokemons, setPokemons] = useState<CustomPokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        const pokemonResponse = await api.listPokemons(offset, limit);
        const pokemonPromises = pokemonResponse.results.map(async (pokemon) => {
          try {
            const pokemonDetails = await api.getPokemonByName(pokemon.name);
            const pokemonData: CustomPokemon = {
              name: pokemonDetails.name,
              id: pokemonDetails.id,
              types: pokemonDetails.types.map((type) => type.type.name),
            };
            return pokemonData;
          } catch (error) {
            console.error(error);
            throw error;
          }
        });
        const pokemonsList = await Promise.all(pokemonPromises);
        setPokemons(pokemonsList);
        setError(null);
      } catch (error: any) { // eslint-disable-line
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [limit, offset]);

  return { pokemons, loading, error };
};

export default usePokemonList;
