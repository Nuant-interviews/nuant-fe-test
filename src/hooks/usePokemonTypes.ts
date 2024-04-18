import { useState, useEffect } from 'react';
import { NamedAPIResource, PokemonClient } from 'pokenode-ts';

const usePokemonTypes = () => {
  const [types, setTypes] = useState<NamedAPIResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const api = new PokemonClient();
    setLoading(true);
    api.listTypes()
      .then((data) => {
        setTypes(data.results);
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

  return { types, loading, error };
};

export default usePokemonTypes;
