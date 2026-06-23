import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode
} from "react";
import axios from "axios";
import { apiKey } from "../api/config";
import type { FlickrPhoto, FlickrSearchResponse } from "../types/flickr";

export interface PhotoContextValue {
  images: FlickrPhoto[];
  loading: boolean;
  error: string;
  runSearch: (query: string) => Promise<void>;
}

export const PhotoContext = createContext<PhotoContextValue | undefined>(
  undefined
);

interface PhotoContextProviderProps {
  children: ReactNode;
}

const PhotoContextProvider = ({ children }: PhotoContextProviderProps) => {
  const [images, setImages] = useState<FlickrPhoto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const runSearch = useCallback(async (query: string) => {
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
      const response = await axios.get<FlickrSearchResponse>(
        `https://api.flickr.com/services/rest/?${params.toString()}`
      );

      setImages(response.data.photos?.photo ?? []);
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

  const value = useMemo<PhotoContextValue>(
    () => ({ images, loading, error, runSearch }),
    [images, loading, error, runSearch]
  );

  return (
    <PhotoContext.Provider value={value}>{children}</PhotoContext.Provider>
  );
};

export const usePhotos = (): PhotoContextValue => {
  const context = useContext(PhotoContext);
  if (!context) {
    throw new Error("usePhotos must be used within a PhotoContextProvider");
  }
  return context;
};

export default PhotoContextProvider;
