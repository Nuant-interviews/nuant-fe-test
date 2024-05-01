import React, { useEffect, useState } from "react";
import { Pokemon } from "pokenode-ts";
import { getPokemonByName } from "../../../PokemonClient";

interface Props { 
    pokemon: Pokemon,
    handleDialogOpen: (id: Pokemon) => void
 }

const PokemonItem: React.FC<Props> = ({ pokemon, handleDialogOpen }) => {
    const [pokemonItem, setPokemonItem] = useState<Pokemon>();

    useEffect(() => {
        getPokemonByName(pokemon.name).then((resp) => {
            if (resp) {
                setPokemonItem(resp);
            }
        });
    }, [pokemon.name]);

    return (
        <div onClick={() => pokemonItem && handleDialogOpen(pokemonItem)}>
            {pokemonItem?.name}
        </div>
    );
};

export default PokemonItem;
