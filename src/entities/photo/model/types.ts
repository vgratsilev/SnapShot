/**
 * Flickr API domain types.
 * @see https://www.flickr.com/services/api/flickr.photos.search.html
 */
export interface FlickrPhoto {
  id: string;
  secret: string;
  server: string;
  title: string;
}

/** Resolve a photo to a displayable thumbnail URL on `live.staticflickr.com`. */
export function photoUrl(
  photo: Pick<FlickrPhoto, "server" | "id" | "secret">
): string {
  return `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`;
}
