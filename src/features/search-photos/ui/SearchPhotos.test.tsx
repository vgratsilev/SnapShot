import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { MemoryRouter, useLocation } from "react-router-dom";
import { SearchPhotos } from "./SearchPhotos";

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location">{location.pathname}</div>;
};

describe("SearchPhotos", () => {
  it("keeps submit disabled for empty input", () => {
    render(
      <MemoryRouter>
        <SearchPhotos />
      </MemoryRouter>
    );

    expect(screen.getByRole("button", { name: "Search" })).toBeDisabled();
  });

  it("trims input, navigates, and clears the field", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <SearchPhotos />
        <LocationDisplay />
      </MemoryRouter>
    );

    const input = screen.getByLabelText("Search photos");
    await user.type(input, "  city lights  ");
    await user.click(screen.getByRole("button", { name: "Search" }));

    expect(screen.getByTestId("location")).toHaveTextContent(
      "/search/city%20lights"
    );
    expect(input).toHaveValue("");
  });
});
