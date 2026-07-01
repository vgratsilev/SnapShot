import { Outlet, useNavigation } from "react-router-dom";
import { getCategoryByTerm } from "@/shared/config/categories";
import { GallerySkeleton } from "@/widgets/gallery/ui/GalleryStates";
import { Header } from "@/widgets/header/ui/Header";

const getPendingGalleryTitle = (pathname: string | undefined) => {
  const [section, searchInput] = pathname?.split("/").filter(Boolean) ?? [];

  if (section) {
    const category = getCategoryByTerm(section);
    if (category) {
      return category.title;
    }
  }

  if (section === "search" && searchInput) {
    return "Search Images";
  }

  return null;
};

/**
 * Root layout: persistent header + routed page content via `<Outlet />`.
 * This is the `element` on the root (parent) route, so every child route
 * renders inside the header.
 */
export const App = () => {
  const navigation = useNavigation();
  const pendingTitle = getPendingGalleryTitle(navigation.location?.pathname);
  const isGalleryLoading = navigation.state === "loading" && pendingTitle;

  return (
    <div className="container">
      <Header />
      {isGalleryLoading ? <GallerySkeleton title={pendingTitle} /> : <Outlet />}
    </div>
  );
};
