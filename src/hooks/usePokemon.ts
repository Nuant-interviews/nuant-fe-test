import { useState, useEffect } from 'react';
import { Pokemon, PokemonClient } from 'pokenode-ts';

const usePokemon = (pokemonName: string) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pokemonName) return;

    const api = new PokemonClient();
    setLoading(true);

    api.getPokemonByName(pokemonName)
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
  }, [pokemonName]);

  return { pokemon, loading, error };
};

export default usePokemon;
