import React, { createContext, useCallback, useMemo, useState } from "react";
import axios from "axios";
import { apiKey } from "../api/config";

export const PhotoContext = createContext();

const PhotoContextProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const runSearch = useCallback(async query => {
    const searchTerm = query.trim();

    if (!searchTerm) {
      setImages([]);
      setError("");
      setLoading(false);
      return;
    }

    if (!apiKey) {
      setImages([]);
      setError("Flickr API key is missing.");
      setLoading(false);
      return;
    }

    const params = new URLSearchParams({
      method: "flickr.photos.search",
      api_key: apiKey,
      tags: searchTerm,
      per_page: "24",
      format: "json",
      nojsoncallback: "1"
    });

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `https://api.flickr.com/services/rest/?${params.toString()}`
      );

      setImages(response.data.photos?.photo || []);
    } catch (requestError) {
      console.error(
        "Encountered an error with fetching and parsing data",
        requestError
      );
      setImages([]);
      setError("Unable to load images from Flickr.");
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({ images, loading, error, runSearch }),
    [images, loading, error, runSearch]
  );

  return (
    <PhotoContext.Provider value={value}>{children}</PhotoContext.Provider>
  );
};

export default PhotoContextProvider;
