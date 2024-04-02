import React, { useContext } from 'react';
import { PokemonContext } from '../App';


const Root: React.FC = () => {
    const context = useContext(PokemonContext);
    return (
        <div>
            <h1>Pokedex</h1>
            <input 
                type='text'
                placeholder='Search Pokemon'
            />
            <ul>
                {context.pokemons.map((pokemon) => {
                    console.log(pokemon);
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