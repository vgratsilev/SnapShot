import type { FlickrPhoto } from "@/entities/photo";
import { PhotoGrid } from "./PhotoGrid";
import { GalleryEmpty } from "./GalleryStates";

interface GalleryProps {
  photos: FlickrPhoto[];
  error?: string;
}

/**
 * Gallery widget. Renders the grid for a list of photos, or an error state
 * when the loader surfaced a failure. The route page owns loading state via
 * React Router's deferred loader data.
 */
export const Gallery = ({ photos, error }: GalleryProps) => {
  if (error) {
    return <GalleryEmpty title="Images unavailable" message={error} />;
  }

  return (
    <div className="photo-container">
      <PhotoGrid photos={photos} />
    </div>
  );
};
