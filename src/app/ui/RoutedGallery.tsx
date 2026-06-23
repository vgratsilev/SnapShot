import { useLoaderData } from "react-router-dom";
import type { PhotoResult } from "@/entities/photo";
import { Gallery } from "@/widgets/gallery";

/**
 * Reads the route loader result and renders the gallery. Used by both category
 * and search routes so their page components stay thin and presentational.
 */
export const RoutedGallery = () => {
  const { photos, error } = useLoaderData() as PhotoResult;
  return <Gallery photos={photos} error={error} />;
};
