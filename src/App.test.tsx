import { cleanup, render, screen } from "@testing-library/react";
import { act } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { App } from "@/app/ui/App";
import { createAppRouter } from "@/app/providers/router";

vi.mock("@/entities/photo/model/loaders", () => ({
  createCategoryLoader: (term: string) => () => ({
    query: term,
    photos: []
  }),
  searchLoader: () => ({
    query: "",
    photos: []
  })
}));

// In tests we use a memory router so we don't depend on the browser URL bar.
// We replicate the same route structure as the production router but with
// `createMemoryRouter` so we can assert the rendered output deterministically.
const createTestRouter = (initialEntry = "/mountain") => {
  const appRouter = createAppRouter();
  // The production router is a HashRouter; for tests a memory router at the
  // given initial entry is sufficient and deterministic.
  const routes = appRouter.routes;
  return createMemoryRouter(routes, { initialEntries: [initialEntry] });
};

afterEach(() => {
  cleanup();
});

describe("App", () => {
  it("renders the gallery shell with header and navigation", async () => {
    render(<RouterProvider router={createTestRouter("/mountain")} />);

    // The header and navigation should render immediately (no data dependency).
    expect(
      screen.getByRole("heading", { level: 1, name: "SnapShot" })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Mountain" })).toBeInTheDocument();
  });

  it("shows gallery skeletons while a route loader is pending", async () => {
    let resolveBeachLoader: (value: unknown) => void = () => {};
    const beachLoader = vi.fn(
      () =>
        new Promise((resolve) => {
          resolveBeachLoader = resolve;
        })
    );
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <App />,
          children: [
            { path: "mountain", element: <div>Mountain route</div> },
            {
              path: "beach",
              element: <div>Beach route</div>,
              loader: beachLoader
            }
          ]
        }
      ],
      { initialEntries: ["/mountain"] }
    );

    render(<RouterProvider router={router} />);
    expect(screen.getByText("Mountain route")).toBeInTheDocument();

    void act(() => {
      void router.navigate("/beach");
    });

    expect(
      await screen.findByRole("heading", {
        level: 2,
        name: "Beach Pictures"
      })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Loading photos")).toBeInTheDocument();

    await act(async () => {
      resolveBeachLoader(null);
    });
  });
});
