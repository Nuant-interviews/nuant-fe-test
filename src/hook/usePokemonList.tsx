import { useEffect, useState } from "react";
import { filterByName } from "../utils/utils";
import { NamedAPIResource } from "pokenode-ts";
import { httpClient } from "../services/api";
import useTypes from "./useTypes";
import usePokemons from "./usePokemons";
import { useGlobalState } from "./useGlobalState";
import { useDispatch } from "./useDispatch";

export interface PokemonByTypeResponse {
  pokemon: NamedAPIResource[];
  slot: string;
}

const usePokemonList = () => {
  const { search, type } = useGlobalState();
  const dispatch = useDispatch();
  const {
    data: pokemonTypes,
    isLoading: isLoadingPokemonTypes,
    error: errorPokemonTypes,
  } = useTypes();
  const {
    data: pokemons,
    isLoading: isLoadingPokemons,
    error: errorPokemons,
  } = usePokemons();

  const [list, setList] = useState<NamedAPIResource[]>(pokemons || []);
  const [results, setResults] = useState<NamedAPIResource[]>([]);
  const [typeList, setTypeList] = useState<NamedAPIResource[]>(
    pokemonTypes || []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (pokemonTypes) {
      setTypeList(pokemonTypes);
    }
    if (pokemons) {
      setList(pokemons);
    }
  }, [pokemonTypes, pokemons]);

  useEffect(() => {
    if (type) {
      fetchByType();
    } else {
      setList(pokemons);
    }
  }, [type]);

  useEffect(() => {
    if (search) {
      updateSearchResults();
    }
  }, [search, list, type]);

  const fetchByType = async () => {
    setIsLoading(true);
    try {
      const response = await httpClient(type?.url as string);
      if (response?.status !== 200) {
        setError(true);
        throw new Error("Failed to fetch pokemons by type");
      }
      setList(
        response.data.pokemon.map((item: PokemonByTypeResponse) => item.pokemon)
      );
    } catch (error) {
      setError(true);
      console.error("Error fetching pokemons by type:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSearchResults = () => {
    setResults(filterByName(list, search));
  };

  const handleSearch = (value: string) => {
    dispatch({ type: "SET_SEARCH", payload: value.trim() });
  };

  const handleType = (item: NamedAPIResource | null) => {
    dispatch({ type: "SET_TYPE", payload: item });
  };

  return {
    list: search ? results : list,
    search,
    typeList,
    type,
    handleSearch,
    handleType,
    isLoading: isLoading || isLoadingPokemons || isLoadingPokemonTypes,
    error: error || errorPokemons || errorPokemonTypes,
  };
};

export default usePokemonList;
