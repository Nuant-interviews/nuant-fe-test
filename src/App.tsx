import './App.css'

import {createBrowserRouter, RouterProvider} from "react-router-dom"


// routes import
import Root from './routes/root'
import Pokemon from './routes/pokemon'

const router = createBrowserRouter([
    { path: '/', element: <Root /> },
    { path: '/pokemons/:pokemonId', element: <Pokemon />, },
])


function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
