import { NamedAPIResource } from "pokenode-ts";

export function extractIDFromUrl(url:string) {
  const parts = url.split('/');
  const lastPart = parts[parts.length - 2];
  const match = lastPart.match(/\d+/);
  if (match) {
    return parseInt(match[0], 10);
  }
  return null;
}

export function filterByName(pokemons:NamedAPIResource[], filterText:string) {
  return pokemons.filter(pokemon => {
    const pokemonName = pokemon.name.toLowerCase();
    const searchText = filterText.toLowerCase();
    return pokemonName.includes(searchText);
  });
}
