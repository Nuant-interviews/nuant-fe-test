import { Link } from 'react-router-dom';
import { FunctionComponent } from "react";
import { CustomPokemon } from "../models/CustomPokemon";

interface PokemonCardProps {
  pokemon: CustomPokemon
}

const PokemonCard: FunctionComponent<PokemonCardProps> = ({ pokemon }) => {
  return (
    <div className="border p-4 rounded-lg hover:bg-sky-900">
      <Link to={`/pokemon/${pokemon.id}`}>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
          alt={pokemon.name}
          className="mx-auto"
        />
        <h2 className="text-lg font-semibold mt-2 capitalize text-center">{pokemon.name}</h2>
        <p className="text-sm mt-2 text-center">
          {pokemon.types.map((type) => (
            <span key={type} className="bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-white mr-1">
              {type}
            </span>
          ))}
        </p>
      </Link>
    </div>
  );
};

export default PokemonCard;
