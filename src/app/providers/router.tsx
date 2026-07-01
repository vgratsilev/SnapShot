import { createHashRouter, Navigate, type RouteObject } from "react-router-dom";
import { CATEGORIES } from "@/shared/config/categories";
import {
  createCategoryLoader,
  searchLoader
} from "@/entities/photo/model/loaders";
import { CategoryPage } from "@/pages/category/ui/CategoryPage";
import { GalleryLoader } from "@/widgets/gallery/ui/GalleryStates";
import { App } from "../ui/App";

/** Create the route tree for `RouterProvider`. */
export const createAppRouter = () =>
  createHashRouter([
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <Navigate to="/mountain" replace /> },

        ...CATEGORIES.map<RouteObject>(({ term, title }) => ({
          path: term,
          element: <CategoryPage title={title} />,
          loader: createCategoryLoader(term),
          hydrateFallbackElement: (
            <div className="photo-container">
              <GalleryLoader />
            </div>
          )
        })),

        // Free-text search route.
        {
          path: "search/:searchInput",
          lazy: () =>
            import("@/pages/search/ui/SearchPage").then((m) => ({
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
            import("@/pages/not-found/ui/NotFoundPage").then((m) => ({
              Component: m.NotFoundPage
            }))
        }
      ]
    }
  ]);
