import { useEffect, useState } from "react";
import pokemonApi from "../services/api";
import { NamedAPIResource } from "pokenode-ts";

const usePokemons = () => {
  const [data, setData] = useState<NamedAPIResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await pokemonApi.listPokemons(0, 1302);
      setData(response.results);
    } catch (error) {
      setError("Error fetching Pokemon list");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default usePokemons;
