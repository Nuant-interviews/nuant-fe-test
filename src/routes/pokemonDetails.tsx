import { Pokemon, PokemonClient } from 'pokenode-ts';
import React, { useState } from 'react';
import {  useParams } from "react-router-dom"

const PokemonDetails: React.FC = () => {
    const {pokemonId} = useParams();
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);

    const fetchPokemon = async () => {
        // fetch pokemon by id
        const pokemonClient = new PokemonClient();
        if(pokemonId) {
            const pokemonDetails = await pokemonClient.getPokemonById(parseInt(pokemonId));
            setPokemon(pokemonDetails);
        }
    }

    React.useEffect(() => {
        fetchPokemon();
    }, []);

    return (
        <div className='
        p-4
        flex flex-1 
        flex-col
        text-start text-white
        w-full h-full 
        bg-neutral-800'>
            
            <div className='absolute right-4 rounded-full  bg-slate-200'>
                {/* render sprites */}
                {pokemon?.sprites?.front_default && <img 
                    className='w-32 h-32'
                    src={pokemon?.sprites?.front_default} alt={pokemon?.name} />}
            </div>
            <div className='flex flex-col'>
                <div className='text-2xl'>{pokemon?.name}</div>
                <br/>
                <div>Base xp: {pokemon?.base_experience}</div>
                <div>Height: {pokemon?.height}</div>
                <div>Weight: {pokemon?.weight}</div>
            </div>
            
            <br/>
            <br/>
            <div>Abilities: {pokemon?.abilities?.map((ability) => ability.ability.name).join(', ')}</div>
            <br/>
            <div>Types: {pokemon?.types?.map((type) => type.type.name).join(', ')}</div>
            <br/>
            <div>Stats: {pokemon?.stats?.map((stat) => `${stat.stat.name}: ${stat.base_stat}`).join(', ')}</div>
            <br/>
            <div>Moves: {pokemon?.moves?.map((move) => move.move.name).join(', ')}</div>
            
        </div>
    );
};

export default PokemonDetails;