import { useState } from 'react';
import usePokemonList from "../hooks/usePokemonList";
import ErrorLoading from "../components/ErrorLoading";
import usePokemonTypes from "../hooks/usePokemonTypes";

const PokemonPage = () => {
  const { pokemons, loading, error } = usePokemonList();
  const { types } = usePokemonTypes()
  const [filterName, setFilterName] = useState('');
  const [filterType, setFilterType] = useState('');

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
          {types.map((type, index) => (
            <option key={index} value={type.name} selected={type.name === filterType}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
      <ErrorLoading error={error} loading={loading}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {pokemons.map((pokemon, index) => (
            <div key={pokemon.name} className="border p-4 rounded-lg">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
                alt={pokemon.name}
                className="mx-auto"
              />
              <h2 className="text-lg font-semibold mt-2 capitalize text-center">{pokemon.name}</h2>
            </div>
          ))}
        </div>
      </ErrorLoading>
    </div>
  );
};

export default PokemonPage;
