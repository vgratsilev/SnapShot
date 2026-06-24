import type { LoaderFunction, LoaderFunctionArgs } from "react-router-dom";
import { loadPhotos } from "./loadPhotos";

/** Category pages: `/mountain`, `/beach`, etc. The route term is the query. */
export const createCategoryLoader =
  (term: string): LoaderFunction =>
  ({ request }) =>
    loadPhotos(term, request.signal);

/** Search page: `/search/:searchInput`. */
export function searchLoader({ params, request }: LoaderFunctionArgs) {
  const term = params.searchInput ?? "";
  return loadPhotos(term, request.signal);
}
