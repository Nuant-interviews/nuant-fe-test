import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { capitalize } from "lodash";
import { PokemonTypes, TypeTag } from "../../components/TypeTag";
import { Pokemon } from "..";
import { Avatar } from "../../components/Avatar";
import { useRouter } from "next/router";

interface PokemonsProps {
  name: string;
  url: string;
}

interface DataPokemons {
  count: number;
  next: string;
  previous: any;
  results: PokemonsProps[];
}

export interface StatsType {
  base_stat: number;
  effort: 0;
  stat: {
    name: string;
    url: string;
  };
}

export interface AbilitiesType {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export const getStaticPaths = async () => {
  const maxPokes = 50;
  const api = "https://pokeapi.co/api/v2/pokemon/";
  const res = await fetch(`${api}/?limit=${maxPokes}`);
  const data: DataPokemons = await res.json();

  const paths = data.results.map((item: any, i: number) => ({
    params: { pokemonID: (i + 1).toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  const id = context.params.pokemonID;
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data: DataPokemons = await res.json();

  return {
    props: { pokemon: data },
  };
};

const PokemonDetailsPage = ({ pokemon }: { pokemon: Pokemon }) => {
  const [bgColor, setBgColor] = useState<string>("transparent");
  const abilities = pokemon.abilities;
  const stats: StatsType[] = pokemon.stats;
  const router = useRouter();

  const changeColor = () => {
    switch (pokemon.types[0].type.name) {
      case "fire":
        setBgColor("bg-types-fire");
        break;
      case "grass":
        setBgColor("bg-types-grass");
        break;
      case "water":
        setBgColor("bg-types-water");
        break;
      case "electric":
        setBgColor("bg-types-electric");
        break;
      case "dragon":
        setBgColor("bg-types-dragon");
        break;
      case "poison":
        setBgColor("bg-types-poison");
        break;
      case "normal":
        setBgColor("bg-types-normal");
        break;
      case "bug":
        setBgColor("bg-types-bug");
        break;
      case "ground":
        setBgColor("bg-types-ground");
        break;
      case "rock":
        setBgColor("bg-types-rock");
        break;
      case "fighting":
        setBgColor("bg-types-fighting");
        break;
      case "fairy":
        setBgColor("bg-types-fairy");
        break;
      case "ice":
        setBgColor("bg-types-ice");
        break;
      case "psychic":
        setBgColor("bg-types-psychic");
        break;
      case "steel":
        setBgColor("bg-types-steel");
        break;
      case "dark":
        setBgColor("bg-types-dark");
        break;
      default:
        break;
    }
  };

  useEffect(() => changeColor(), []);

  return (
    <div className="p-4">
      <Head>
        <title>{capitalize(pokemon.name)}</title>
        <link
          rel="shortcut icon"
          href={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
          type="image/x-icon"
        />
      </Head>
      <div onClick={() => router.back()} className="hover:underline">
        Back
      </div>
      <div className="flex flex-1 h-auto w-full justify-center flex-col md:flex-row">
        <div className="flex flex-column dark:bg-gray-400 p-4">
          <div>
            <div className="m-4">
              <h2 className="uppercase font-bold text-gray-900">
                N°{pokemon.id}
              </h2>
              <h1 className="uppercase font-bold text-gray-900">
                {pokemon.name}
              </h1>
            </div>
            <div className="m-4">
              <h2 className="uppercase font-bold">Stats</h2>
              <div className="flex flex-wrap flex-column gap-1">
                <div className="flex flex-wrap flex-column gap-1">
                  {stats.map(({ base_stat, stat: { name } }) => (
                    <div
                      key={""}
                      style={{
                        display: "flex",
                        flexFlow: "column",
                        width: "100%",
                      }}
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
            <div className="m-4">
              <h2 className="uppercase font-bold">Types</h2>
              <div className="flex gap-3">
                {pokemon.types.map(({ type: { name } }) => (
                  <TypeTag key={name} name={name as PokemonTypes} />
                ))}
              </div>
            </div>
            <div className="m-4">
              <h2 className="uppercase font-bold">Abilities</h2>
              <ul>
                {abilities.map((item, i) => (
                  <li className="capitalize" key={i}>
                    {item.ability.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className={`flex flex-col items-center p-4`}>
          <Avatar
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
            alt={pokemon.name}
            size="large"
            className={bgColor}
          />
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailsPage;
