import { PhotoCategories } from "@/features/photo-categories/ui/PhotoCategories";
import { SearchPhotos } from "@/features/search-photos/ui/SearchPhotos";

/** Site header with brand title, search, and predefined category navigation. */
export const Header = () => {
  return (
    <div>
      <h1>SnapShot</h1>
      <SearchPhotos />
      <PhotoCategories />
    </div>
  );
};
