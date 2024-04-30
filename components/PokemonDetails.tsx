import { useRef } from "react";
import { Pokemon } from "../pages";
import { Avatar } from "./Avatar";
import { capitalize } from "lodash";
import { PokemonTypes, TypeTag } from "./TypeTag";

export const PokemonDetails = ({ pokemon }: { pokemon: Pokemon }) => {
  const refToComponent = useRef(null);

  return (
    <>
      <h1 className="text-2xl font-bold">{capitalize(pokemon.name)}</h1>
      <div
        ref={refToComponent}
        className={`
        dark:bg-gray-400 m-4 flex flex-column
         dark:border-transparent 
         transition-colors 
      `}
      >
        <div className="flex flex-wrap flex-row w-2/4 gap-2">
          <div className="flex flex-wrap flex-row gap-0.5">
            {pokemon?.types.map(({ type: { name } }) => (
              <TypeTag key={name} name={name as PokemonTypes} />
            ))}
          </div>
          <div className="flex flex-wrap flex-column gap-1">
            <div className="flex flex-wrap flex-column gap-1 font-bold">
              Stats
            </div>
            <div className="flex flex-wrap flex-column gap-1">
              {pokemon?.stats.map(({ base_stat, stat: { name } }) => (
                <div
                  key={""}
                  style={{ display: "flex", flexFlow: "column", width: "100%" }}
                >
                  <div>{capitalize(name)}</div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${base_stat}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-row w-2/4 justify-center items-center">
          <Avatar
            size={"large"}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
            alt={`${pokemon.name}'s Avatar`}
          />
        </div>
      </div>
    </>
  );
};
