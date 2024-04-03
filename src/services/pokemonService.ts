import {PokemonClient } from 'pokenode-ts';

export type LocalPokemon = {
    name: string;
    id: number;
    types: string[];
    image?: string | null;
};


//fetches all pokemons names from the API
const fetchAllPokemons = async ({noOfPokemons, offset}: {noOfPokemons: number, offset?: number}): Promise<LocalPokemon[]> => {        
    const pokemonClient = new PokemonClient();
    const pokemonResponse = await pokemonClient.listPokemons(offset, noOfPokemons);
    // const pokemonsList: Pokemon[] = [];
    const pokemonPromises = pokemonResponse.results.map(pokemon => { 
        return new Promise<LocalPokemon>((resolve, reject) => {
            pokemonClient.getPokemonByName(pokemon.name).then((pokemonDetails) => {
                resolve({
                    name: pokemonDetails.name,
                    id: pokemonDetails.id,
                    types: pokemonDetails.types.map(type => type.type.name),
                    image: pokemonDetails.sprites.front_default,
                });
            }).catch((error) => {
                console.error(error);
                reject(error);
            });
        }) 
    });
    const pokemonsList: LocalPokemon[] = await Promise.all(pokemonPromises);
    return pokemonsList;
}   

//stores a list of pokemons in local storage
const storePokemons = (pokemons: LocalPokemon[]) => {
    localStorage.setItem('pokemons', JSON.stringify(pokemons));
}

//gets a list of pokemons from local storage
const retrivePokemons = (): LocalPokemon[] => {
    return JSON.parse(localStorage.getItem('pokemons') || '[]');
}

//get all pokemons from localstorage if avalable else fetch from API and store them in local storage
const getAllPokemons = async (): Promise<LocalPokemon[]> => {
    let pokemons = retrivePokemons();
    if (pokemons.length === 0) {
        for(let i = 0; i <= 13; i++) {
            const partOfPokemons = await fetchAllPokemons({
                noOfPokemons: 100,
                offset: i * 100
            });
            pokemons = [...pokemons, ...partOfPokemons]; 
        }
        storePokemons(pokemons);
    }
    return pokemons;
}

const fetchAllPokemonTypes = async (): Promise<string[]> => {
    const pokemonClient = new PokemonClient();
    const pokemonTypes = await pokemonClient.listTypes();
    return pokemonTypes.results.map(type => type.name);
}

const storePokemonTypes = (types: string[]) => {
    localStorage.setItem('pokemonTypes', JSON.stringify(types));
}

const retrivePokemonTypes = (): string[] => {
    return JSON.parse(localStorage.getItem('pokemonTypes') || '[]');
}

const getAllPokemonTypes = async (): Promise<string[]> => {
    let types = retrivePokemonTypes();
    if (types.length === 0) {
        types = await fetchAllPokemonTypes();
        storePokemonTypes(types);
    }
    return types;
}


export default {
    getAllPokemons: getAllPokemons,
    getAllPokemonTypes: getAllPokemonTypes,
}
