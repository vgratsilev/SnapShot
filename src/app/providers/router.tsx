import { createHashRouter, Navigate, type RouteObject } from "react-router-dom";
import { categoryLoader, searchLoader } from "@/entities/photo";
import { App, RoutedGallery } from "../ui";
import { GalleryLoader } from "@/widgets/gallery";

/** Create the route tree for `RouterProvider`. */
export const createAppRouter = () =>
  createHashRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <Navigate to="/mountain" replace /> },

        // Category routes: each one runs `categoryLoader` with its `searchTerm`
        // param and renders the gallery via `RoutedGallery`.
        ...(["mountain", "beach", "bird", "food"] as const).map<RouteObject>(
          (term) => ({
            path: term,
            element: (
              <>
                <h2>{term} Pictures</h2>
                <RoutedGallery />
              </>
            ),
            loader: categoryLoader,
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
