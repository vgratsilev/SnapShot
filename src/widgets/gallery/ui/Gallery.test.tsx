import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Gallery } from "./Gallery";

describe("Gallery", () => {
  it("renders the empty state when there are no photos", () => {
    render(<Gallery photos={[]} />);

    expect(
      screen.getByRole("heading", { name: "No Images Found" })
    ).toBeInTheDocument();
  });

  it("renders an error state when loading failed", () => {
    render(<Gallery photos={[]} error="Flickr failed" />);

    expect(
      screen.getByRole("heading", { name: "Images unavailable" })
    ).toBeInTheDocument();
    expect(screen.getByText("Flickr failed")).toBeInTheDocument();
  });
});
