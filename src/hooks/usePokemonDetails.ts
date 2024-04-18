import { useEffect, useState } from 'react';
import { Pokemon } from 'pokenode-ts';
import { api } from '../api';

const usePokemonDetails = (id?: string) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    api.getPokemonById(+id)
      .then((data) => {
        setPokemon(data);
        setError(null);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return { pokemon, loading, error };
};

export default usePokemonDetails