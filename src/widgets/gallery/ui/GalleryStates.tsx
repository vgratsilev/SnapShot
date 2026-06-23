interface GalleryStatesProps {
  title?: string;
  message?: string;
}

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
