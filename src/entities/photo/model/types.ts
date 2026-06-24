/**
 * Flickr API domain types.
 * @see https://www.flickr.com/services/api/flickr.photos.search.html
 */
export interface FlickrPhoto {
  id: string;
  owner: string;
  secret: string;
  server: string;
  farm: number;
  title: string;
  ispublic: number;
  isfriend: number;
  isfamily: number;
}

export interface FlickrPhotosPage {
  page: number;
  pages: number;
  perpage: number;
  total: string;
  photo: FlickrPhoto[];
}

export interface FlickrSearchResponse {
  photos?: FlickrPhotosPage;
  stat: "ok" | "fail";
  code?: number;
  message?: string;
}

/** Resolve a photo to a displayable thumbnail URL on `live.staticflickr.com`. */
export function photoUrl(
  photo: Pick<FlickrPhoto, "server" | "id" | "secret">
): string {
  return `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`;
}
