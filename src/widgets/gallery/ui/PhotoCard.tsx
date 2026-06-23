import { photoUrl, type FlickrPhoto } from "@/entities/photo";

interface PhotoCardProps {
  photo: FlickrPhoto;
}

/** A single gallery thumbnail. Lazy-loaded for performance. */
export const PhotoCard = ({ photo }: PhotoCardProps) => (
  <li>
    <img
      src={photoUrl(photo)}
      alt={photo.title || "Flickr photo"}
      loading="lazy"
    />
  </li>
);
