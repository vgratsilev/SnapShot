import React, { useContext, useEffect } from "react";
import { PhotoContext } from "../context/PhotoContext";
import Gallery from "./Gallery";
import Loader from "./Loader";
import NoImages from "./NoImages";

const Container = ({ searchTerm }) => {
  const { images, loading, error, runSearch } = useContext(PhotoContext);

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
