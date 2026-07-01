import { Cache } from "@/shared/lib/cache";
import { fetchPhotos } from "../api/flickr";
import type { FlickrPhoto } from "./types";

const PHOTO_CACHE_MAX_ENTRIES = 20;
const PHOTO_CACHE_TTL_MS = 10 * 60 * 1000;

const photoCache = new Cache<string, FlickrPhoto[]>({
  maxEntries: PHOTO_CACHE_MAX_ENTRIES,
  ttlMs: PHOTO_CACHE_TTL_MS
});

export interface PhotoResult {
  query: string;
  photos: FlickrPhoto[];
  /** Present when the fetch failed; the UI renders an error state instead of throwing. */
  error?: string;
}

/**
 * Load photos for a query, hitting the cache first.
 */
export async function loadPhotos(
  query: string,
  signal?: AbortSignal
): Promise<PhotoResult> {
  const trimmed = query.trim();
  if (!trimmed) {
    return { query: trimmed, photos: [] };
  }

  const cached = photoCache.get(trimmed);
  if (cached) {
    return { query: trimmed, photos: cached };
  }

  try {
    const photos = await fetchPhotos(trimmed, signal);
    photoCache.set(trimmed, photos);
    return { query: trimmed, photos };
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw error;
    }

    const message =
      error instanceof Error
        ? error.message
        : "Unable to load images from Flickr.";
    return { query: trimmed, photos: [], error: message };
  }
}
