import { useEffect } from "react";
import { usePhotos } from "../context/PhotoContext";
import Gallery from "./Gallery";
import Loader from "./Loader";
import NoImages from "./NoImages";

interface ContainerProps {
  searchTerm: string;
}

const Container = ({ searchTerm }: ContainerProps) => {
  const { images, loading, error, runSearch } = usePhotos();

  useEffect(() => {
    runSearch(searchTerm);
  }, [runSearch, searchTerm]);

  return (
    <div className="photo-container">
      {loading ? (
        <Loader />
      ) : error ? (
        <NoImages title="Images unavailable" message={error} />
      ) : (
        <Gallery data={images} />
      )}
    </div>
  );
};

export default Container;
