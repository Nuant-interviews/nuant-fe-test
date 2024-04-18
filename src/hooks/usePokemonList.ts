import { useEffect, useState } from 'react';
import { NamedAPIResource, PokemonClient } from 'pokenode-ts';

const usePokemonList = () => {
  const [pokemons, setPokemons] = useState<NamedAPIResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const api = new PokemonClient();
    setLoading(true);

    api.listPokemons()
      .then((data) => {
        setPokemons(data.results);
        setError(null);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });

  }, []);

  return { pokemons, loading, error };
};

export default usePokemonList;
