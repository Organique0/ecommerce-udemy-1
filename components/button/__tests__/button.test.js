import { render, screen } from "@testing-library/react";
import Button from "../Button";

describe("button tests", () => {
  test("should render base button when nothing is passed", () => {
    render(<Button />);
    expect(screen.getByRole("button")).toHaveStyle("background-color: white");
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  test("shoud render google button when passed google button type", () => {
    render(<Button buttonType="google-sign-in" />);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveStyle("background-color: #357ae8");
  });

  test("should render inverted button when passed inverted button type", () => {
    render(<Button buttonType="inverted" />);

    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveStyle("background-color: black");
    expect(buttonElement).toHaveStyle("color: white");
  });

  test("should be disabled if isLoading is true", () => {
    render(<Button isLoading={true} />);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
