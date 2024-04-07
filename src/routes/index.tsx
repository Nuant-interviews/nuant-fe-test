import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "./notFound";
import ROUTE_PATHS from "./routePaths";
import { CircularProgress } from "@mui/material";

const Root = lazy(() => import("../pages/PokemonList"));
const DetailsPage = lazy(() => import("../pages/PokemonDetails"));

function AppRoutes() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Routes>
        <Route path={ROUTE_PATHS.MAIN} element={<Root />} />
        <Route
          path={`${ROUTE_PATHS.MAIN}/:pokemonName`}
          element={<DetailsPage />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
