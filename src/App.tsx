import { PokemonClient } from 'pokenode-ts';

function App() {
  (async () => {
    const api = new PokemonClient();

    await api
      .getPokemonByName('luxray')
      .then((data) => console.log(data)) // will output "Luxray"
      .catch((error) => console.error(error));
  })();

  return (
    <>

    </>
  )
}

export default App
