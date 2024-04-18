import usePokemon from "../hooks/usePokemon";

const PokemonDetails = () => {
  const { pokemon, loading, error } = usePokemon('luxray');

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500">Error loading data!</p>;
  if (!pokemon) return <p className="text-center">No Pokémon data!</p>;

  return (
    <div className="text-center">
      <h1 className="text-xl font-bold">{pokemon.name}</h1>
      {pokemon.sprites.front_default && <img src={pokemon.sprites.front_default} alt={pokemon.name} />}
      <p>{pokemon.species.name}</p>
    </div>
  );
};

export default PokemonDetails;
