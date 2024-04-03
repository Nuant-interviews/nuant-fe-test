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
        <div className="p-2 flex-row  flex justify-between border-b-2 mb-4 border-gray-500">
            <input
                className="border-2 border-gray-500 p-1 basis-2/3  mr-4"
                type="text"
                placeholder="Search Pokemon"
                onChange={handleSearch}
            />
            <div className="flex flex-col border-2 border-gray-500 p-1 basis-1/3">
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