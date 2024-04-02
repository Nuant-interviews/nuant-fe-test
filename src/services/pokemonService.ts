import { NamedAPIResource, PokemonClient } from 'pokenode-ts';

//handles pokemons from the API or from local storage if available

//fetches all pokemons names from the API
const fetchAllPokemonNames = async (): Promise<NamedAPIResource[]> => {        
    const pokemonClient = new PokemonClient();
    const pokemonResponse = await pokemonClient.listPokemons(0, 1302);
    return pokemonResponse.results;
}   

//stores a list of pokemons in local storage
const storePokemonNames = (pokemons: NamedAPIResource[]) => {
    localStorage.setItem('pokemons', JSON.stringify(pokemons));
}

//gets a list of pokemons from local storage
const retrivePokemonNames = (): NamedAPIResource[] => {
    return JSON.parse(localStorage.getItem('pokemons') || '[]');
}

//get all pokemons from localstorage if avalable else fetch from API and store them in local storage
const getAllPokemonNames = async (): Promise<NamedAPIResource[]> => {
    let pokemonNames = retrivePokemonNames();
    if (pokemonNames.length === 0) {
        pokemonNames = await fetchAllPokemonNames(); 
        storePokemonNames(pokemonNames);
    }
    return pokemonNames;
}


export default {
    getAllPokemonNames: getAllPokemonNames
}
