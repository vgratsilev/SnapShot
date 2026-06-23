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
  total: number;
  photo: FlickrPhoto[];
}

export interface FlickrSearchResponse {
  photos?: FlickrPhotosPage;
  stat: "ok" | "fail";
  code?: number;
  message?: string;
}
