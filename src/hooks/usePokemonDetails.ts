import { useEffect, useState } from 'react';
import { Pokemon, PokemonSpecies } from 'pokenode-ts';
import { api } from '../api';

const usePokemonDetails = (id?: string) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [speciesDetails, setSpeciesDetails] = useState<PokemonSpecies | null>(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      if (!id) return;

      setLoading(true);

      try {
        // Fetch main Pokemon details
        const pokemonData = await api.getPokemonById(+id);
        setPokemon(pokemonData);

        // Fetch form details if available
        if (pokemonData.forms && pokemonData.forms.length > 0) {
          // const formId = pokemonData.forms[0].id; // Assuming the first form is the default
          const speciesDetails = await api.getPokemonSpeciesById(+id);
          setSpeciesDetails(speciesDetails);
          console.log(speciesDetails);
        }

        setError(null);
      } catch (error: any) { // eslint-disable-line
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  return { pokemon, loading, error, speciesDetails };
};

export default usePokemonDetails