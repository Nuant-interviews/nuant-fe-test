import { useEffect, useState } from "react";
import pokemonApi from "../services/api";
import { NamedAPIResource } from "pokenode-ts";

const useTypes = () => {
  const [data, setData] = useState<NamedAPIResource[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const response = await pokemonApi.listTypes();
      setData(response.results);
    } catch (error) {
      setError("Error fetching Pokemon types list");
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

export default useTypes;
