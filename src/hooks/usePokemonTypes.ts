import { useState, useEffect } from 'react';
import { NamedAPIResource } from 'pokenode-ts';
import { api } from '../api';

const usePokemonTypes = () => {
  const [types, setTypes] = useState<NamedAPIResource[]>([]);

  useEffect(() => {
    api.listTypes()
      .then((data) => {
        setTypes(data.results);
      })
      .catch((error) => {
        console.error(error);
      })
  }, []);

  return { types };
};

export default usePokemonTypes;
