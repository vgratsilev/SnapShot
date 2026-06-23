import { SearchPhotos } from "@/features/search-photos";
import { PhotoCategories } from "@/features/photo-categories";

/**
 * Site header: brand title, free-text search, and curated category navigation.
 * Composed entirely from features — no business logic lives here.
 */
export const Header = () => {
  return (
    <div>
      <h1>SnapShot</h1>
      <SearchPhotos />
      <PhotoCategories />
    </div>
  );
};
