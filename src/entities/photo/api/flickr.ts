import { getJson } from "@/shared/api";
import { FLICKR_API_KEY } from "@/shared/config";
import type { FlickrPhoto } from "../model/types";

const ENDPOINT = "https://api.flickr.com/services/rest/";
const PER_PAGE = "24";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isFlickrPhoto = (value: unknown): value is FlickrPhoto => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.owner === "string" &&
    typeof value.secret === "string" &&
    typeof value.server === "string" &&
    typeof value.farm === "number" &&
    typeof value.title === "string" &&
    typeof value.ispublic === "number" &&
    typeof value.isfriend === "number" &&
    typeof value.isfamily === "number"
  );
};

const parseFlickrPhotos = (data: unknown): FlickrPhoto[] => {
  if (!isRecord(data)) {
    throw new Error("Flickr API returned an invalid response.");
  }

  if (data.stat === "fail") {
    throw new Error(
      typeof data.message === "string"
        ? data.message
        : "Flickr API request failed."
    );
  }

  if (data.stat !== "ok") {
    throw new Error("Flickr API returned an unknown response status.");
  }

  if (!isRecord(data.photos)) {
    return [];
  }

  const photos = data.photos.photo;
  if (!Array.isArray(photos)) {
    throw new Error("Flickr API returned an invalid photo list.");
  }

  if (!photos.every(isFlickrPhoto)) {
    throw new Error("Flickr API returned an invalid photo item.");
  }

  return photos;
};

/**
 * Search Flickr for photos matching `query`.
 *
 * Throws a typed `ApiError` on non-2xx responses and an `Error` if the API key
 * is missing or Flickr returns an API-level failure.
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
    text: query,
    sort: "relevance",
    safe_search: "1",
    per_page: PER_PAGE,
    format: "json",
    nojsoncallback: "1"
  });

  const data = await getJson(`${ENDPOINT}?${params.toString()}`, { signal });

  return parseFlickrPhotos(data);
}
