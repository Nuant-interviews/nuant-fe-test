import { api } from '../api';
import { useQuery } from "react-query";

const usePokemonDetails = (id?: string) => {
  const { data: pokemon, isLoading: pokemonLoading, isError: pokemonError } = useQuery(['pokemonById', id], async () => {
    if (!id) return null;

    return api.getPokemonById(+id);
  });


  const { data: speciesDetails, isLoading: speciesLoading, isError: speciesError } = useQuery(['pokemonSpecies', id], async () => {
    if (!id) return null;

    return await api.getPokemonSpeciesById(+id);
  });

  const loading = pokemonLoading || speciesLoading;
  const error = pokemonError || speciesError;

  return { pokemon, loading, error, speciesDetails };
};

export default usePokemonDetails