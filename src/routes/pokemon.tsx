import React from 'react';
import {  useParams } from "react-router-dom"

const Pokemon: React.FC = () => {
    const {pokemonId} = useParams();
    return (
        <div>
            Pokemon { pokemonId }
        </div>
    );
};

export default Pokemon;