import "./App.css";
import AppRoutes from "./routes";
import { Container, Typography } from "@mui/material";

function App() {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Pokedex
      </Typography>
      <AppRoutes />
    </Container>
  );
}

export default App;
