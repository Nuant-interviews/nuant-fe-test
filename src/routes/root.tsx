import React, { useContext, useState } from 'react';
import { PokemonContext } from '../App';
import { LocalPokemon } from '../services/pokemonService';
import SearchPokemons from '../components/SearchPokemons';
import { Link } from 'react-router-dom';


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
        context.lastSearch = search;
        context.lastTypeSelected = type;
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
                            
                        key={pokemon.id}>
                            <Link 
                            className='
                                h-24
                                align-center
                                flex
                                flex-row
                                text-start hover:bg-slate-400 p-2 cursor-pointer'
                            to={`/pokemons/${pokemon.id}`}>
                                    {pokemon.image && <img src={pokemon.image} alt={pokemon.name} />}
                                    <div className='self-center'>{pokemon.name}</div>
                            </Link>
                        </li>
                    );
                })}
            </ul>

        </div>
    );
    
};

export default Root;