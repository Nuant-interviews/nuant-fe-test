import { useState } from "react";

export default function SearchPokemons(
    {
        onChange,
        types
    }: 
    {
        onChange?: (search: string, type: string) => void,
        types: string[]
    }){
    
    const [search, setSearch] = useState('');
    const [selectedType, setSelectedType] = useState('');

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        onChange && onChange(event.target.value, selectedType);
    }

    const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(event.target.value);
        onChange && onChange(search, event.target.value);
    }

    return (
        <div className="p-2 sm:flex-col md:flex-row flex">
            <input
                className="border-2 border-gray-500 p-1"
                type="text"
                placeholder="Search Pokemon"
                onChange={handleSearch}
            />
            <div className="flex flex-col border-2 border-gray-500 p-1">
                <label htmlFor="types">Choose a type:</label>
                <select 
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