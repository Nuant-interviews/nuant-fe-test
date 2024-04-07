import { useEffect, useState } from "react";
import { Item } from "../../components";
import { extractIDFromUrl } from "../../utils/utils";
import { v4 as uuid } from "uuid";
import { Button, Divider, Grid, Typography } from "@mui/material";
import Dropdown from "../../components/Dropdown";
import Search from "../../components/Search";
import { useNavigate } from "react-router-dom";
import usePokemonList from "../../hook/usePokemonList";
import { NamedAPIResource } from "pokenode-ts";

export const DEFAULT_ITEMS_TO_DISPLAY = 10;

const PokemonList = () => {
  const { list, search, typeList, handleSearch, handleType, type, isLoading } =
    usePokemonList();

  const [currentPage, setCurrentPage] = useState(1);
  const [loadedItems, setLoadedItems] = useState<NamedAPIResource[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentPage(1);
    setLoadedItems([]);
  }, [list, type, search]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * DEFAULT_ITEMS_TO_DISPLAY;
    const endIndex = currentPage * DEFAULT_ITEMS_TO_DISPLAY;
    const newItems = list.slice(startIndex, endIndex);
    setLoadedItems((prevItems) => [...prevItems, ...newItems]);
  }, [list, currentPage]);

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const renderItems = () => {
    return list.length ? (
      <>
        {loadedItems.map((item: NamedAPIResource) => {
          const pokemonId = extractIDFromUrl(item.url);
          const imageUrl = pokemonId
            ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`
            : null;
          const onClick = () => {
            navigate(`/${item.name}`);
          };
          return (
            <Item
              key={uuid()}
              title={item.name}
              avatartUrl={imageUrl}
              onClick={onClick}
            />
          );
        })}
        {list.length > loadedItems.length && (
          <Button onClick={loadMore}>Load More</Button>
        )}
      </>
    ) : (
      <Typography>No pokemon found</Typography>
    );
  };

  return (
    <Grid container flexDirection="column">
      <Divider sx={{ margin: "20px 0" }} />
      <Grid item style={{ display: "flex", justifyContent: "space-between" }}>
        <Search value={search || ""} onChange={handleSearch} />
        <Dropdown items={typeList} onChange={handleType} selected={type} />
      </Grid>
      <Divider sx={{ margin: "20px 0" }} />
      <Grid item>
        {isLoading ? <Typography>Loading...</Typography> : renderItems()}
      </Grid>
    </Grid>
  );
};

export default PokemonList;
