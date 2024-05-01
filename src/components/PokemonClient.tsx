import { PokemonClient } from 'pokenode-ts';

export const getPokemonTypes = async () => {
  const api = new PokemonClient();

  return await api
    .listTypes()
    .then((data) => data)
    .catch((error) => console.error(error));
};

export const getAllPokemons = async () => {
  const api = new PokemonClient();

  return await api
    .listPokemons(0, 1000)
    .then((data) => {
      if (data && data.results) {
        const promises = data.results.map(p => getPokemonByName(p.name));

        return Promise.all(promises);
      } else {
        return [];
      }
    })
    .catch((error) => console.error(error));
};

export const getPokemonByName = async (name: string) => {
  const api = new PokemonClient();

  return await api
    .getPokemonByName(name)
    .then((data) => data)
    .catch((error) => console.error(error));
};


