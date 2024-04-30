import { describe, expect, test } from "vitest";
import { act, fireEvent, render } from "@testing-library/react";
import { Pokemons } from "./Pokemons";

const pokemons: any[] = [
  {
    base_experience: 64,
    height: 7,

    id: 1,

    name: "bulbasaur",
    order: 1,

    types: [
      {
        slot: 1,
        type: { name: "poison", url: "https://pokeapi.co/api/v2/type/4/" },
      },
    ],
    weight: 69,
  },
];
const pokemonsTypes = [
  { caption: "Normal", id: "normal" },
  { caption: "Fighting", id: "fighting" },
  { caption: "Flying", id: "flying" },
  { caption: "Poison", id: "poison" },
  { caption: "Ground", id: "ground" },
];

describe("<Pokemons /> component", () => {
  test("page is rendered properly", () => {
    const { getByTestId } = render(
      <Pokemons pokemons={pokemons} pokemonsTypes={pokemonsTypes} />
    );

    expect(getByTestId("select-input")).toBeTruthy();
    expect(getByTestId("search-input")).toBeTruthy();
    expect(getByTestId("table-component")).toBeTruthy();
    expect(getByTestId("pagination-component")).toBeTruthy();
  });

  test("pokemons rows are displayed properly", () => {
    const { queryAllByTestId } = render(
      <Pokemons pokemons={pokemons} pokemonsTypes={pokemonsTypes} />
    );
    expect(queryAllByTestId("table-row").length).toEqual(1);
  });

  test("search by name is working properly", () => {
    const { queryAllByTestId, getByTestId } = render(
      <Pokemons pokemons={pokemons} pokemonsTypes={pokemonsTypes} />
    );
    expect(queryAllByTestId("table-row").length).toEqual(1);

    const input = getByTestId("search-input");

    fireEvent.change(input, { target: { value: "not matching" } });

    expect(queryAllByTestId("table-row").length).toEqual(0);
  });

  test("type filtering does not match anything", () => {
    const { queryAllByTestId, getByTestId } = render(
      <Pokemons pokemons={pokemons} pokemonsTypes={pokemonsTypes} />
    );
    expect(queryAllByTestId("table-row").length).toEqual(1);

    const triggerDropdownButton = getByTestId("select-input");

    fireEvent.click(triggerDropdownButton);
    fireEvent.click(queryAllByTestId("select-option")[2]);

    expect(queryAllByTestId("table-row").length).toEqual(0);
  });

  test("type filtering does match results", () => {
    const { queryAllByTestId, getByTestId } = render(
      <Pokemons pokemons={pokemons} pokemonsTypes={pokemonsTypes} />
    );
    expect(queryAllByTestId("table-row").length).toEqual(1);

    const triggerDropdownButton = getByTestId("select-input");

    fireEvent.click(triggerDropdownButton);
    const options = queryAllByTestId("select-option");
    console.log(options.map((e) => console.log(e.textContent)));
    fireEvent.click(queryAllByTestId("select-option")[3]);

    expect(queryAllByTestId("table-row").length).toEqual(1);
  });
});
