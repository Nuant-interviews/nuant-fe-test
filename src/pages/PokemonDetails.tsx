import usePokemonDetails from "../hooks/usePokemonDetails";
import { useNavigate, useParams } from "react-router";
import ErrorLoading from "../components/ErrorLoading";
import { Pokemon } from "pokenode-ts";

const PokemonDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { pokemon, speciesDetails, loading, error } = usePokemonDetails(id);
  const handleBack = () => {
    navigate(-1);
  };

  if (!pokemon) return null;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <button className="mb-4 text-white-600" onClick={handleBack}>
        &lt; Back
      </button>

      <ErrorLoading error={error} loading={loading}>
        <h1 className="text-3xl font-bold mb-4 capitalize text-center">{pokemon.name}</h1>

        <div className="grid grid-cols-4">
          {(['front_default', 'front_shiny', 'back_default', 'back_shiny'] as (keyof Pokemon['sprites'])[])
            .map((spriteType) => (
              <img
                key={spriteType}
                src={pokemon.sprites[spriteType] as string}
                className="mx-auto"
                style={{ maxWidth: '100px' }}
              />
            ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h2 className="text-lg font-semibold">Height</h2>
            <p>{pokemon.height} decimetres</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Weight</h2>
            <p>{pokemon.weight} hectograms</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Base Experience</h2>
            <p>{pokemon.base_experience}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Types</h2>
            <ul>
              {pokemon.types.map(({ type }) => (
                <li key={type.name}>{type.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Abilities</h2>
            <ul>
              {pokemon.abilities.map(({ ability }) => (
                <li key={ability.name}>{ability.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Stats</h2>
            <ul>
              {pokemon.stats.map(({ stat, base_stat }) => (
                <li key={stat.name}><span className="font-semibold">{stat.name}:</span> {base_stat}</li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Species Details</h2>
          <p><span className="font-semibold">Shape:</span> {speciesDetails?.shape.name}</p>
          <p><span className="font-semibold">Habitat:</span> {speciesDetails?.habitat.name}</p>
          <p><span className="font-semibold">Growth rate:</span> {speciesDetails?.growth_rate.name}</p>
          <p><span className="font-semibold">Hatch counter:</span> {speciesDetails?.hatch_counter}</p>
          <p><span
            className="font-semibold">Hatch gender differences:</span> {speciesDetails?.has_gender_differences ? 'yes' : 'no'}
          </p>
        </div>
      </ErrorLoading>
    </div>
  );
};

export default PokemonDetails;
