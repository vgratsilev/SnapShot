import { Outlet, useNavigation } from "react-router-dom";
import { GallerySkeleton } from "@/widgets/gallery";
import { Header } from "@/widgets/header";

const CATEGORY_TITLES: Record<string, string> = {
  mountain: "Mountain Pictures",
  beach: "Beach Pictures",
  bird: "Bird Pictures",
  food: "Food Pictures"
};

const getPendingGalleryTitle = (pathname: string | undefined) => {
  const [section, searchInput] = pathname?.split("/").filter(Boolean) ?? [];

  if (section && CATEGORY_TITLES[section]) {
    return CATEGORY_TITLES[section];
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
