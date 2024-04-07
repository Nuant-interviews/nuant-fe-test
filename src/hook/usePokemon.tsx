import { Pokemon } from "pokenode-ts";
import { useEffect, useState } from "react";
import pokemonApi from "../services/api";

const usePokemon = (name: string | undefined) => {
  const [details, setDetails] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        if (name) {
          const response = await pokemonApi.getPokemonByName(name);
          setDetails(response);
        }
      } catch (error) {
        setError("Error fetching Pokemon details");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [name]);

  return { details, loading, error };
};

export default usePokemon;
