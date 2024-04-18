import { useState, useEffect } from 'react';
import { NamedAPIResource } from 'pokenode-ts';
import { api } from '../api';

const usePokemonTypes = () => {
  const [types, setTypes] = useState<NamedAPIResource[]>([]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const data = await api.listTypes();
        setTypes(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTypes();

  }, []);

  return { types };
};

export default usePokemonTypes;
