import { useLoaderData } from "react-router-dom";
import type { PhotoResult } from "@/entities/photo";
import { Gallery } from "@/widgets/gallery";

/**
 * Free-text search page (`/search/:searchInput`). Reads the resolved photo data
 * from the route's `loader` (defined in `app/ui/App.tsx`) and renders the
 * gallery widget.
 */
export const SearchPage = () => {
  const { query, photos, error } = useLoaderData() as PhotoResult;

  return (
    <div>
      <h2>{query} Images</h2>
      <Gallery photos={photos} error={error} />
    </div>
  );
};
