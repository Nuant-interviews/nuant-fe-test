import { Link, useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Button,
  Avatar,
  Typography,
  Divider,
} from "@mui/material";
import InfoSection from "../../components/InfoSection";
import usePokemon from "../../hook/usePokemon";

const PokemonDetails = () => {
  const { pokemonName } = useParams();
  const { details, loading, error } = usePokemon(pokemonName);
  if (loading) {
    return <Typography>Loading...</Typography>;
  }
  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Container>
      <Typography
        variant="h2"
        style={{ textTransform: "capitalize" }}
        gutterBottom
      >
        {pokemonName}
      </Typography>

      <Grid container spacing={0} justifyContent="center" textAlign={"left"}>
        {details ? (
          <>
            <Grid item xs={12} sm={3}>
              <Typography variant="h5">Info</Typography>
              <Divider sx={{ margin: "6px 0" }} />
              <InfoSection
                info={[
                  ["Species", details?.species.name],
                  [
                    "Abilities",
                    details?.abilities
                      .map((item) => item.ability.name)
                      .join(", "),
                  ],
                  [
                    "Type",
                    details?.types?.map((item) => item.type.name).join(", "),
                  ],
                  ["Height", `${details?.height / 10} m`],
                  ["Weight", `${details?.weight / 10} kg`],
                ]}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              display={"flex"}
              justifyContent={"center"}
            >
              <Avatar
                alt={pokemonName}
                src={
                  details.sprites?.other?.["official-artwork"].front_default ||
                  details.sprites.front_default ||
                  ""
                }
                sx={{ height: "200px", width: "200px" }}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <Typography variant="h5">Stats</Typography>
              <Divider sx={{ margin: "6px 0" }} />
              {details.stats.map((stat) => (
                <Typography
                  variant="body1"
                  key={stat.stat.name}
                  sx={{ textAlign: "left", textTransform: "capitalize" }}
                >
                  {stat.stat.name}: {stat.base_stat}
                </Typography>
              ))}
            </Grid>
          </>
        ) : (
          <Typography>Pokemon not found</Typography>
        )}

        <Grid item margin={"16px 0"}>
          <Button component={Link} to={"/"} variant="outlined">
            Go back
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PokemonDetails;
