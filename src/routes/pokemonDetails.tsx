import React from 'react';
import {  useParams } from "react-router-dom"

const PokemonDetails: React.FC = () => {
    const {pokemonId} = useParams();
    return (
        <div>
            Pokemon { pokemonId }
        </div>
    );
};

export default PokemonDetails;