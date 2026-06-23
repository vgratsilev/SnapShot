import { getJson } from "@/shared/api";
import { FLICKR_API_KEY } from "@/shared/config";
import type { FlickrPhoto, FlickrSearchResponse } from "../model/types";

const ENDPOINT = "https://api.flickr.com/services/rest/";
const PER_PAGE = "24";

/**
 * Search Flickr for photos matching `query`.
 *
 * Throws a typed `ApiError` on non-2xx responses and an `Error` if the API key
 * is missing — callers decide how to surface these.
 */
export async function fetchPhotos(
  query: string,
  signal?: AbortSignal
): Promise<FlickrPhoto[]> {
  if (!FLICKR_API_KEY) {
    throw new Error("Flickr API key is missing.");
  }

  const params = new URLSearchParams({
    method: "flickr.photos.search",
    api_key: FLICKR_API_KEY,
    tags: query,
    per_page: PER_PAGE,
    format: "json",
    nojsoncallback: "1"
  });

  const data = await getJson<FlickrSearchResponse>(
    `${ENDPOINT}?${params.toString()}`,
    { signal }
  );

  return data.photos?.photo ?? [];
}
