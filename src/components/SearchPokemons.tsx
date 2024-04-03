import { useContext, useEffect, useState } from "react";
import { PokemonContext } from "../App";

export default function SearchPokemons(
    {
        onChange,
        types
    }: 
    {
        onChange?: (search: string, type: string) => void,
        types: string[]
    }){
    
    const context = useContext(PokemonContext);

    const [search, setSearch] = useState(context.lastSearch || '');
    const [selectedType, setSelectedType] = useState(context.lastTypeSelected || '');

    useEffect(() => {
        console.log("context.lastSearch", context.lastSearch);
        setSearch(context.lastSearch || '');
        setSelectedType(context.lastTypeSelected || '');
        onChange && onChange(context.lastSearch || '', context.lastTypeSelected || '');
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        onChange && onChange(event.target.value, selectedType);
    }

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(event.target.value);
        onChange && onChange(search, event.target.value);
    }

    return (
        <div className="p-2 flex-row  flex justify-between border-b-2 mb-4 border-gray-500">
            <input
                className="border-2 border-gray-500 p-1 basis-2/3  mr-4"
                type="text"
                placeholder="Search Pokemon"
                onChange={handleSearch}
                value={search}
            />
            <div className="flex flex-col border-2 border-gray-500 p-1 basis-1/3">
                <label htmlFor="types">Choose a type:</label>
                <select 
                    defaultValue={selectedType}
                    id="types" name="types" onChange={handleTypeChange}>
                    <option value="">All</option>
                    {types.map(type => {
                        return <option key={type} value={type}>{type}</option>
                    })}
                </select>
            </div>
            

        </div>
    )
}