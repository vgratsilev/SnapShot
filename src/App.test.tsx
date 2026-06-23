import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { HashRouter } from "react-router-dom";
import App from "./App";

afterEach(() => {
  cleanup();
});

describe("App", () => {
  it("renders the gallery shell", () => {
    render(
      <HashRouter>
        <App />
      </HashRouter>
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "SnapShot" })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Mountain" })).toBeInTheDocument();
  });
});
