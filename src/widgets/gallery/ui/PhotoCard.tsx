import { useState } from "react";
import { photoUrl, type FlickrPhoto } from "@/entities/photo/model/types";

interface PhotoCardProps {
  photo: FlickrPhoto;
}

/** A single gallery thumbnail. Lazy-loaded for performance. */
export const PhotoCard = ({ photo }: PhotoCardProps) => {
  const [isImageReady, setIsImageReady] = useState(false);

  const handleImageSettled = () => {
    setIsImageReady(true);
  };

  return (
    <li className="photo-card" aria-busy={!isImageReady}>
      {!isImageReady && <span className="photo-skeleton" aria-hidden="true" />}
      <img
        className={`photo-image ${isImageReady ? "is-loaded" : ""}`}
        src={photoUrl(photo)}
        alt={photo.title || "Flickr photo"}
        loading="lazy"
        onLoad={handleImageSettled}
        onError={handleImageSettled}
      />
    </li>
  );
};
