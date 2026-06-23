import { Cache } from "@/shared/lib";
import { fetchPhotos } from "../api/flickr";
import type { FlickrPhoto } from "./types";

/**
 * Per-query in-memory cache so revisiting a route does not refetch. Lives for
 * the current page session only.
 */
const photoCache = new Cache<string, FlickrPhoto[]>();

export interface PhotoResult {
  query: string;
  photos: FlickrPhoto[];
  /** Present when the fetch failed; the UI renders an error state instead of throwing. */
  error?: string;
}

/**
 * Load photos for a query, hitting the cache first.
 */
export async function loadPhotos(query: string): Promise<PhotoResult> {
  const trimmed = query.trim();
  if (!trimmed) {
    return { query: trimmed, photos: [] };
  }

  const cached = photoCache.get(trimmed);
  if (cached) {
    return { query: trimmed, photos: cached };
  }

  try {
    const photos = await fetchPhotos(trimmed);
    photoCache.set(trimmed, photos);
    return { query: trimmed, photos };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to load images from Flickr.";
    return { query: trimmed, photos: [], error: message };
  }
}

export { photoCache };
