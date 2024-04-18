import { useQuery } from 'react-query';
import { api } from '../api';

const usePokemonTypes = () => {
  const { data: types = [], isLoading, isError } = useQuery('pokemonTypes', async () => {
    const data = await api.listTypes();
    return data.results;
  });

  return { types, isLoading, isError };
};

export default usePokemonTypes;
