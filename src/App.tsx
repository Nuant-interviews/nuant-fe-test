import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "react-query";
import PokemonList from "./pages/PokemonList";
import PokemonDetails from "./pages/PokemonDetails";

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route index path="/" element={<PokemonList/>}/>
          <Route path="/pokemon/:id" element={<PokemonDetails/>}/>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
