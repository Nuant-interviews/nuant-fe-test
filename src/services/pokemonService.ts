import { Pokemon, PokemonClient } from 'pokenode-ts';

//handles pokemons from the API or from local storage if available

//fetches all pokemons names from the API
const fetchAllPokemons = async (): Promise<Pokemon[]> => {        
    const pokemonClient = new PokemonClient();
    const pokemonResponse = await pokemonClient.listPokemons(0, 10);
    // const pokemonsList: Pokemon[] = [];
    const pokemonPromises = pokemonResponse.results.map(pokemon => { 
        return new Promise<Pokemon>((resolve, reject) => {
            pokemonClient.getPokemonByName(pokemon.name).then((pokemonDetails) => {
                resolve(pokemonDetails);
            }).catch((error) => {
                console.error(error);
                reject(error);
            });
        }) 
    });
    const pokemonsList: Pokemon[] = await Promise.all(pokemonPromises);
    return pokemonsList;
}   

//stores a list of pokemons in local storage
const storePokemons = (pokemons: Pokemon[]) => {
    localStorage.setItem('pokemons', JSON.stringify(pokemons));
}

//gets a list of pokemons from local storage
const retrivePokemons = (): Pokemon[] => {
    return JSON.parse(localStorage.getItem('pokemons') || '[]');
}

//get all pokemons from localstorage if avalable else fetch from API and store them in local storage
const getAllPokemons = async (): Promise<Pokemon[]> => {
    let pokemons = retrivePokemons();
    if (pokemons.length === 0) {
        pokemons = await fetchAllPokemons(); 
        storePokemons(pokemons);
    }
    return pokemons;
}


export default {
    getAllPokemons: getAllPokemons
}
