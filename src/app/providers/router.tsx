import { createHashRouter, Navigate, type RouteObject } from "react-router-dom";
import { createCategoryLoader, searchLoader } from "@/entities/photo";
import { CategoryPage } from "@/pages/category";
import { App } from "../ui";
import { GalleryLoader } from "@/widgets/gallery";

/** Create the route tree for `RouterProvider`. */
export const createAppRouter = () =>
  createHashRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <Navigate to="/mountain" replace /> },

        // Category routes: each static route owns the query it loads.
        ...(["mountain", "beach", "bird", "food"] as const).map<RouteObject>(
          (term) => ({
            path: term,
            element: <CategoryPage searchTerm={term} />,
            loader: createCategoryLoader(term),
            hydrateFallbackElement: (
              <div className="photo-container">
                <GalleryLoader />
              </div>
            )
          })
        ),

        // Free-text search route.
        {
          path: "search/:searchInput",
          lazy: () =>
            import("@/pages/search").then((m) => ({
              Component: m.SearchPage
            })),
          loader: searchLoader,
          hydrateFallbackElement: (
            <div className="photo-container">
              <GalleryLoader />
            </div>
          )
        },

        // 404 fallback.
        {
          path: "*",
          lazy: () =>
            import("@/pages/not-found").then((m) => ({
              Component: m.NotFoundPage
            }))
        }
      ]
    }
  ]);
