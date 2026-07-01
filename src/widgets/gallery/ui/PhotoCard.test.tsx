import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PhotoCard } from "./PhotoCard";

const photo = {
  id: "1",
  secret: "secret",
  server: "server",
  title: "A Flickr photo"
};

describe("PhotoCard", () => {
  it("shows a skeleton until the lazy image settles", () => {
    const { container } = render(<PhotoCard photo={photo} />);

    expect(screen.getByRole("listitem")).toHaveAttribute("aria-busy", "true");
    expect(container.querySelector(".photo-skeleton")).toBeInTheDocument();

    fireEvent.load(screen.getByRole("img", { name: "A Flickr photo" }));

    expect(screen.getByRole("listitem")).toHaveAttribute("aria-busy", "false");
    expect(container.querySelector(".photo-skeleton")).not.toBeInTheDocument();
    expect(screen.getByRole("img", { name: "A Flickr photo" })).toHaveClass(
      "is-loaded"
    );
  });
});
