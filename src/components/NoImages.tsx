interface NoImagesProps {
  title?: string;
  message?: string;
}

const NoImages = ({
  title = "No Images Found",
  message = "Please try a different search term"
}: NoImagesProps) => (
  <div>
    <h2>{title}</h2>
    <p>{message}</p>
  </div>
);

export default NoImages;
