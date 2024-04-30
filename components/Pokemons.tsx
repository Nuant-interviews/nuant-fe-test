import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
  useFilters,
} from "react-table";
import { useCallback, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Pokemon } from "../pages";
import { SelectMenu } from "./Select";
import { Avatar } from "./Avatar";
import { InputGroup } from "./Input";
import { TableComponent } from "./Table";
import { Pagination } from "./Pagination";
import { Drawer } from "./Drawer";
import { PokemonDetails } from "./PokemonDetails";
import { PokemonTypes, TypeTag } from "./TypeTag";
import Link from "next/link";

const getColumns = ({
  onSelect,
}: {
  onSelect: (pokemonId: number) => void;
}) => [
  {
    Header: "No",
    accessor: "id",
    Cell: ({ value }: { row: Pokemon; value: string }) => {
      return (
        <div
          className="hover:cursor-pointer capitalize my-1 hover:underline"
          onClick={() => onSelect(parseInt(value))}
        >
          <Avatar
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${value}.png`}
            alt={`${value}'s Avatar`}
          />
        </div>
      );
    },
  },
  {
    Header: "Name",
    accessor: "name",
    Cell: ({ row, value }: { row: Pokemon; value: string }) => {
      return (
        <Link href={`/pokemon/${parseInt(row.id) + 1}`}>
          <span className="capitalize">{value}</span>
        </Link>
      );
    },
  },
  {
    Header: "Weight",
    accessor: "weight",
    Cell: ({ value }: { row: Pokemon; value: string }) => {
      return <div className="my-1">{value}</div>;
    },
  },
  {
    id: "type",
    Header: "Primary Type",
    accessor: (row: Pokemon) => row.types[0].type.name,
    Cell: ({ value }: { row: Pokemon; value: string }) => {
      return <TypeTag name={value as PokemonTypes} />;
    },
  },
];

export function Pokemons({
  pokemons,
  pokemonsTypes,
}: {
  pokemons: Pokemon[];
  pokemonsTypes: any[];
}) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  const onClose = useCallback(() => setPokemon(null), []);
  const onSelect = useCallback(
    (pokemonId: number) => {
      setPokemon(pokemons.find((e) => parseInt(e.id) == pokemonId) ?? null);
    },
    [pokemons]
  );

  const columns = useMemo(
    () =>
      getColumns({
        onSelect,
      }),
    [onSelect]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    setGlobalFilter,
    page: rows,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    state: { pageIndex },
    setFilter,
  } = useTable(
    {
      columns,
      data: pokemons,
      initialState: {
        pageSize: 10,
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <div className="flex flex-col gap-4 pt-6">
      <div className="flex flex-col sm:flex-row justify-between gap-2">
        <InputGroup
          name="search"
          value={state.globalFilter}
          onChange={(e) => {
            setGlobalFilter(e.target.value);
          }}
          label="Search"
          decoration={<FaSearch size="1rem" className="text-gray-400" />}
        />

        <SelectMenu
          className="sm:w-44"
          value={state.filters?.find((f) => f.id === "type")?.value}
          setValue={(value: string) => setFilter("type", value)}
          options={pokemonsTypes}
        />
      </div>
      <TableComponent
        getTableProps={getTableProps}
        headerGroups={headerGroups}
        getTableBodyProps={getTableBodyProps}
        rows={rows}
        prepareRow={prepareRow}
      />
      {!!rows.length && (
        <div className="flex justify-center">
          <Pagination
            gotoPage={gotoPage}
            canPreviousPage={canPreviousPage}
            canNextPage={canNextPage}
            pageCount={pageCount}
            pageIndex={pageIndex}
          />
        </div>
      )}

      <Drawer
        isOpen={!!pokemon}
        title={null}
        description={null}
        onClose={onClose}
      >
        {pokemon && <PokemonDetails pokemon={pokemon} />}
      </Drawer>
    </div>
  );
}
