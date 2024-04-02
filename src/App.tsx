import './App.css'

import {createBrowserRouter, RouterProvider} from "react-router-dom"
import { createContext } from 'react'

// routes import
import Root from './routes/root'
import Pokemon from './routes/pokemon'

const router = createBrowserRouter([
    { path: '/', element: <Root /> },
    { path: '/pokemons/:pokemonId', element: <Pokemon />, },
])

const PokemonContext = createContext(null);


function App() {

  return (
    <>
      <PokemonContext.Provider value={null}>
        <RouterProvider router={router}/>
      </PokemonContext.Provider>
    </>
  )
}

export default App
