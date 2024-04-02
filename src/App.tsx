import './App.css'

import {createBrowserRouter, RouterProvider} from "react-router-dom"
import { createContext, useEffect, useState } from 'react'

// routes import
import Root from './routes/root'
import PokemonDetails from './routes/pokemonDetails'

import pokemonService from './services/pokemonService'
import { Pokemon } from 'pokenode-ts'

const router = createBrowserRouter([
    { path: '/', element: <Root /> },
    { path: '/pokemons/:pokemonId', element: <PokemonDetails />, },
])

export const PokemonContext = createContext<{
  pokemons: Pokemon[];
}>({
  pokemons: []
});


function App() {

  const [isLoading, setIsLoading] = useState(true);

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    setIsLoading(true);
    pokemonService.getAllPokemons().then((pokemonsList) => {
      setPokemons(pokemonsList);
      setIsLoading(false);
    });
  }, []);

  

  return (
    <>
      {isLoading ? 
        <div>Loading...</div> : 
        <PokemonContext.Provider value={{pokemons}}>
          <RouterProvider router={router}/>
        </PokemonContext.Provider>
      }
    </>
  )
}

export default App
