import { useLoaderData } from "react-router-dom";
import type { PhotoResult } from "@/entities/photo";
import { Gallery } from "@/widgets/gallery";

interface CategoryPageProps {
  searchTerm: string;
}

/**
 * Category page. The route config owns the concrete category query and its
 * loader; this component renders the resolved photos for that category.
 */
export const CategoryPage = ({ searchTerm }: CategoryPageProps) => {
  const { photos, error } = useLoaderData() as PhotoResult;

  return (
    <div>
      <h2>{searchTerm} Pictures</h2>
      <Gallery photos={photos} error={error} />
    </div>
  );
};
