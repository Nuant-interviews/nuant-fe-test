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
}>({
  pokemons: []
});


function App() {

  const [isLoading, setIsLoading] = useState(true);

  const [pokemons, setPokemons] = useState<LocalPokemon[]>([]);

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
