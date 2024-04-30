import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import { Avatar } from "./Avatar";

test("Page", () => {
  const { container } = render(
    <Avatar
      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/bulbasaur.png`}
      alt={`Test's Avatar`}
    />
  );

  expect(container).toMatchSnapshot();
});
