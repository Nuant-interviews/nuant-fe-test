import type { NextPage } from "next";
import Head from "next/head";
import { Pokemons } from "../components/Pokemons";
import { Spinner } from "../components/Spinner";
import { capitalize } from "lodash";
import { AbilitiesType, StatsType } from "./pokemon/[pokemonID]";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

const api = "https://pokeapi.co/api/v2";

export interface PokemonsProps {
  name: string;
  url: string;
}

export interface Pokemon {
  abilities: AbilitiesType[];
  base_experience: number;
  cries: {
    latest: string;
    legacy: string;
  };
  forms: [
    {
      name: string;
      url: string;
    }
  ];
  height: number;
  held_items: [];
  id: string;
  is_default: true;
  name: string;
  order: number;
  sprites: {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
  };
  stats: StatsType[];
  types: {
    slot: number;
    type: { name: string; url: string };
  }[];
  weight: number;
}

export interface DataPokemons {
  count: number;
  next: string;
  previous: any;
  results: PokemonsProps[];
}

export async function getStaticProps() {
  const maxPokes = 50;

  const [types, pokemons] = await Promise.all([
    fetch(`${api}/type/`),
    fetch(`${api}/pokemon/?limit=${maxPokes}`),
  ]);

  const { results } = await types.json();
  const data: DataPokemons = await pokemons.json();

  const promises = data.results.map(async (p) => (await fetch(p.url)).json());
  const pokList = await Promise.all(promises);

  console.log("alex", pokList[1].types);

  return {
    props: {
      pokemonTypes: results.map((p: { name: string; url: string }) => ({
        caption: capitalize(p.name),
        id: p.name,
      })),
      pokemons: pokList,
    },
  };
}

const Home: NextPage = ({ pokemons, pokemonTypes }: any) => {
  return (
    <div className="w-full flex flex-1 min-h-screen flex-col items-center">
      <Head>
        <title>Pokédex</title>
        <link
          rel="icon"
          href="https://img.icons8.com/stickers/100/000000/pokeball.png"
        />
      </Head>

      {pokemons.length > 0 ? (
        <Pokemons pokemons={pokemons} pokemonsTypes={pokemonTypes} />
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Home;
