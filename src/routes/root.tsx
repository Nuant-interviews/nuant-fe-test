import React from 'react';

import pokemonService from '../services/pokemonService';

const Root: React.FC = () => {

    const fetchPokemon = async () => {
        // get all pokemons from pokemon service
        await pokemonService.getAllPokemonNames();
    }

    return (
        <div>
            <button onClick={() => fetchPokemon()}>Fetch Pikachu</button>
        </div>
    );
    
};

export default Root;