import { beforeEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { Button } from "./Button";

describe("<Button /> component", () => {
  const onClickFn = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test("button active", () => {
    const { container } = render(
      <Button content={"Test"} onClick={onClickFn} active={true} />
    );

    const activeClass = "bg-red-500 text-white";
    expect(container.getElementsByClassName(activeClass).length).toEqual(1);
  });

  test("button inactive", () => {
    const { container } = render(
      <Button content={"Test"} onClick={onClickFn} active={false} />
    );

    const activeClass = "bg-red-500 text-white";
    expect(container.getElementsByClassName(activeClass).length).toEqual(0);
  });

  test("button on click calls callback", () => {
    const { container } = render(
      <Button content={"Test"} onClick={onClickFn} active={true} />
    );

    const activeClass = "bg-red-500 text-white";
    const button = container.getElementsByClassName(activeClass)[0];
    fireEvent.click(button);

    expect(onClickFn).toHaveBeenCalled();
  });
});
