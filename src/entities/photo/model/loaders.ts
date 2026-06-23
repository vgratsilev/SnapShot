import type { LoaderFunctionArgs } from "react-router-dom";
import { loadPhotos } from "./loadPhotos";

/** Category pages: `/mountain`, `/beach`, etc. The category *is* the query. */
export function categoryLoader({ params }: LoaderFunctionArgs) {
  const term = params.searchTerm ?? "";
  return loadPhotos(term);
}

/** Search page: `/search/:searchInput` (URL-encoded). */
export function searchLoader({ params }: LoaderFunctionArgs) {
  const term = decodeURIComponent(params.searchInput ?? "");
  return loadPhotos(term);
}
