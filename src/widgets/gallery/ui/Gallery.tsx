import type { FlickrPhoto } from "@/entities/photo/model/types";
import { PhotoGrid } from "./PhotoGrid";
import { GalleryEmpty } from "./GalleryStates";

interface GalleryProps {
  photos: FlickrPhoto[];
  error?: string;
}

/**
 * Gallery widget. Renders photos or an error state from route loader data.
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
