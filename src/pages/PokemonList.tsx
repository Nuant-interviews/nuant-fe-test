import { useMemo, useState } from 'react';
import usePokemonList from "../hooks/usePokemonList";
import ErrorLoading from "../components/ErrorLoading";
import usePokemonTypes from "../hooks/usePokemonTypes";
import PokemonCard from "../components/PokemonCard";

const PokemonList = () => {
  const { pokemons, loading, error } = usePokemonList();
  const { types } = usePokemonTypes()
  const [filterName, setFilterName] = useState('');
  const [filterType, setFilterType] = useState('');

  const filteredPokemons = useMemo(() => {
    return pokemons.filter(pokemon => {
      const nameMatch = pokemon.name.toLowerCase().includes(filterName.toLowerCase());
      const typeMatch = !filterType || pokemon.types.includes(filterType);
      return nameMatch && typeMatch;
    });
  }, [pokemons, filterName, filterType]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Pokedex</h1>
      <div className="flex mb-4">
        <input
          type="text"
          className="w-1/2 p-2 border rounded-l"
          placeholder="Filter by name"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
        <select
          className="w-1/2 p-2 border rounded-r"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">Filter by type</option>
          {types.map(({ name }) => (<option key={name} value={name}>{name}</option>))}
        </select>
      </div>
      <ErrorLoading error={error} loading={loading}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPokemons.map((pokemon) => (
            <PokemonCard pokemon={pokemon} key={pokemon.name}/>
          ))}
        </div>
        {filteredPokemons.length === 0 &&
          <div className="flex justify-center items-center h-20">No pokemons found</div>}
      </ErrorLoading>
    </div>
  );
};

export default PokemonList;
