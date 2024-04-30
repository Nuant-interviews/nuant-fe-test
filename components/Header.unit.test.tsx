import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";
import { Header } from "./Header";

describe("<Header /> component", () => {
  test("header is rendered properly", () => {
    const { container } = render(<Header />);

    expect(container).toMatchSnapshot();
  });
});
