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
        <div>
            Pokemon Details
            <br/>
            Pokemon Name: {pokemon?.name}
        </div>
    );
};

export default PokemonDetails;