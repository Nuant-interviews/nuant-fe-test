import React, { ReactElement, useEffect, useState } from "react";
import { getAllPokemons, getPokemonTypes } from "../PokemonClient";
import { NamedAPIResource, Pokemon } from "pokenode-ts";
import { Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import PokemonItem from "./components/Pokemon/PokemonItem";
interface Props { }

const PokeDex: React.FC<Props> = () => {
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [types, setTypes] = useState<NamedAPIResource[]>([]);
    const [pokemons, setPokemons] = useState<(void | Pokemon)[]>([]);
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>();

    useEffect(() => {
        getPokemonTypes().then((resp) => {
            if (resp) {
                setTypes(resp.results);
            }
        });
        getAllPokemons().then((resp) => {
            if (resp) {
                setPokemons(resp);
            }
        });
    }, []);

    const handleDialogOpen = (pokemonItem: Pokemon) => {
        setSelectedPokemon(pokemonItem);
    }

    const handleDialogClose = () => {
        setSelectedPokemon(undefined);
    };

    const setFilteredPokemons = (typedName: string, selectedType: string) => {
        getAllPokemons().then((resp) => {
            if (resp) {
                const allPokemons = resp;
                if (allPokemons) {
                    const filteredAfterType = allPokemons?.filter((p) => {
                        if (p) {
                            if (selectedType && typedName) {
                                return p.types.some(t => t.type.name === selectedType) && p.name.includes(typedName);
                            } else if (selectedType) {
                                return p.types.some(t => t.type.name === selectedType);

                            } else if (typedName) {
                                return p.name.includes(typedName);
                            }
                            return true;
                        }
                        return false;
                    })
                    setPokemons(filteredAfterType);
                }
            }
        });
    }

    const handleTypeChange = (e: SelectChangeEvent) => {
        const selectedType = e.target.value;
        setType(selectedType as string);
        setFilteredPokemons(name, selectedType);
    };

    const handleNameChange = (newName: string) => {
        setName(newName);
        setFilteredPokemons(newName, type);
    };

    const getShownPokemons = () => {
        const pokemonList = pokemons.reduce((acc: ReactElement[], p: void | Pokemon) => {
            if (p) {
                acc.push(<PokemonItem pokemon={p} handleDialogOpen={() => handleDialogOpen(p)} />);
            }
            return acc;
        }, []);
        if (pokemonList.length === 0) {
            return <div>No pokemons match your selections</div>;
        }

        return pokemonList;
    };

    return (
        <div>
            <FormControl className="formControl" fullWidth>
                <div>
                    <InputLabel>Type</InputLabel>
                    <Select
                        className="select"
                        value={type}
                        label="Age"
                        onChange={handleTypeChange}
                    >
                        {types.map((t) => {
                            return <MenuItem value={t.name}>{t.name}</MenuItem>
                        })}
                    </Select></div>
                <TextField className="nameInput" label="Name" variant="outlined" onChange={(e) => handleNameChange(e.target.value as string)}> {name} </TextField>
            </FormControl>
            <div>
                {getShownPokemons()}
            </div>
            <Dialog onClose={handleDialogClose} open={!!selectedPokemon}>
                <DialogTitle>{selectedPokemon?.name}</DialogTitle>
                <DialogContent>
                    <div> {`Name: ${selectedPokemon?.name}`}</div>
                    <div> {`Species: ${selectedPokemon?.species.name}`}</div>
                    <div> {`Types: ${selectedPokemon?.types.map(t => t.type.name).join(', ')}`}</div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PokeDex;
