import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { createAppRouter } from "@/app/providers";

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
});
