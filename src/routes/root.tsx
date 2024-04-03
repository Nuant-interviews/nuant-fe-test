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
        <div className='w-full bg-slate-300 '>
            <h1 className='text-start'>Pokedex</h1>
            <br/>
            <SearchPokemons 
                onChange={(search, type) => filterPokemons(search, type)}
                types={context.pokemonTypes}
            />
            <ul>
                {filteredPokemons.map((pokemon: LocalPokemon) => {
                    return (
                        <li
                            className='
                                h-24
                                align-center
                                flex
                                flex-row
                                text-start hover:bg-slate-400 p-2 cursor-pointer'
                        key={pokemon.id}>
                            {pokemon.image && <img src={pokemon.image} alt={pokemon.name} />}
                            <a 
                                className='
                                    text-xl
                                    self-center
                                    ml-4'
                                href={`/pokemons/${pokemon.id}`}>{pokemon.name}</a>
                        </li>
                    );
                })}
            </ul>

        </div>
    );
    
};

export default Root;