interface GalleryStatesProps {
  title?: string;
  message?: string;
}

interface GallerySkeletonProps {
  title?: string;
  count?: number;
}

const DEFAULT_SKELETON_COUNT = 24;

/** Empty / error placeholder rendered when there are no photos to show. */
export const GalleryEmpty = ({
  title = "No Images Found",
  message = "Please try a different search term"
}: GalleryStatesProps) => (
  <div>
    <h2>{title}</h2>
    <p>{message}</p>
  </div>
);

/** Spinner shown while a route loader is resolving. */
export const GalleryLoader = () => <div className="loader" />;

/** Grid placeholder shown while photo data or thumbnail images are loading. */
export const GallerySkeleton = ({
  title = "Loading Images",
  count = DEFAULT_SKELETON_COUNT
}: GallerySkeletonProps) => (
  <div>
    <h2>{title}</h2>
    <div className="photo-container" aria-label="Loading photos">
      <ul>
        {Array.from({ length: count }, (_, index) => (
          <li className="photo-card" key={index} aria-hidden="true">
            <span className="photo-skeleton" />
          </li>
        ))}
      </ul>
    </div>
  </div>
);
