import {PokemonClient } from 'pokenode-ts';

export type LocalPokemon = {
    name: string;
    id: number;
    types: string[];
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
        for(let i = 0; i < 13; i++) {
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


export default {
    getAllPokemons: getAllPokemons
}
