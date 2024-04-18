import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonList from "./pages/PokemonList";
import PokemonDetails from "./pages/PokemonDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<PokemonList/>}/>
        <Route path="/pokemon/:id" element={<PokemonDetails/>}/>
      </Routes>
    </Router>
  )
}

export default App
