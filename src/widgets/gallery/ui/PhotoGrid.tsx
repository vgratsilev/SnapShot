import type { FlickrPhoto } from "@/entities/photo/model/types";
import { PhotoCard } from "./PhotoCard";
import { GalleryEmpty } from "./GalleryStates";

interface PhotoGridProps {
  photos: FlickrPhoto[];
}

/** Responsive grid of photo thumbnails, or the empty state when there are none. */
export const PhotoGrid = ({ photos }: PhotoGridProps) => {
  if (photos.length === 0) {
    return <GalleryEmpty />;
  }

  return (
    <div>
      <ul>
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </ul>
    </div>
  );
};
