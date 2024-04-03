import './App.css'

import {createBrowserRouter, RouterProvider} from "react-router-dom"
import { createContext, useEffect, useState } from 'react'

// routes import
import Root from './routes/root'
import PokemonDetails from './routes/pokemonDetails'

import pokemonService, { LocalPokemon } from './services/pokemonService'

const router = createBrowserRouter([
    { path: '/', element: <Root /> },
    { path: '/pokemons/:pokemonId', element: <PokemonDetails />, },
])

export const PokemonContext = createContext<{
  pokemons: LocalPokemon[];
  pokemonTypes: string[];
  lastSearch?: string;
  lastTypeSelected?: string;
}>({
  pokemons: [],
  pokemonTypes: [],
  lastSearch: '',
  lastTypeSelected: '',
});


function App() {

  const [isLoading, setIsLoading] = useState(true);

  const [pokemons, setPokemons] = useState<LocalPokemon[]>([]);
  const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      pokemonService.getAllPokemons(),
      pokemonService.getAllPokemonTypes()
    ]).then(([pokemonsList, typesList]) => {
      setPokemons(pokemonsList);
      setPokemonTypes(typesList);
      setIsLoading(false);
    });
  }, []);

  

  return (
    <>
      {isLoading ? 
        <div>Loading...</div> : 
        <PokemonContext.Provider value={{pokemons, pokemonTypes}}>
          <RouterProvider router={router}/>
        </PokemonContext.Provider>
      }
    </>
  )
}

export default App
