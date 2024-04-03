import React, { useContext, useState } from 'react';
import { PokemonContext } from '../App';
import { LocalPokemon } from '../services/pokemonService';


const Root: React.FC = () => {
    const context = useContext(PokemonContext);
    const [filteredPokemons, setFilteredPokemons] = useState<LocalPokemon[]>(context.pokemons);



    const filterPokemons = (search: string) => {
        setFilteredPokemons(context.pokemons.filter((pokemon) => {
            return pokemon.name.includes(search);
        }));
    }

    return (
        <div>
            <h1>Pokedex</h1>
            <input 
                type='text'
                placeholder='Search Pokemon'
                onChange={(event) => filterPokemons(event.target.value)}
            />
            
            <label htmlFor="types">Choose a type:</label>

            <select name="types" id="types">
                {context.pokemonTypes.map((type) => {
                    return (
                        <option key={type} value={type}>{type}</option>
                    );
                })}
            </select>

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