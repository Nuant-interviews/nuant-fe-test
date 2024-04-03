import React, { useContext, useState } from 'react';
import { PokemonContext } from '../App';
import { LocalPokemon } from '../services/pokemonService';
import SearchPokemons from '../components/SearchPokemons';


const Root: React.FC = () => {
    const context = useContext(PokemonContext);
    const [filteredPokemons, setFilteredPokemons] = useState<LocalPokemon[]>(context.pokemons);



    const filterPokemons = (search: string, type: string) => {
        let filteredPokemons = context.pokemons;
        if(search) {
            filteredPokemons = filteredPokemons.filter((pokemon) => {
                return pokemon.name.toLowerCase().includes(search.toLowerCase());
            });
        }
        if(type) {
            filteredPokemons = filteredPokemons.filter((pokemon) => {
                return pokemon.types.includes(type);
            });
        }
        setFilteredPokemons(filteredPokemons);
    }

    return (
        <div>
            <h1>Pokedex</h1>
            <br/>
            <SearchPokemons 
                onChange={(search, type) => filterPokemons(search, type)}
                types={context.pokemonTypes}
            />
            <ul>
                {filteredPokemons.map((pokemon: LocalPokemon) => {
                    return (
                        <li key={pokemon.id}>
                            <a href={`/pokemons/${pokemon.id}`}>{pokemon.name}</a>
                        </li>
                    );
                })}
            </ul>

        </div>
    );
    
};

export default Root;