import { useLoaderData } from "react-router-dom";
import type { PhotoResult } from "@/entities/photo/model/loadPhotos";
import { Gallery } from "@/widgets/gallery/ui/Gallery";

interface CategoryPageProps {
  title: string;
}

/**
 * Category page. The route config owns the concrete query, title, and loader.
 */
export const CategoryPage = ({ title }: CategoryPageProps) => {
  const { photos, error } = useLoaderData() as PhotoResult;

  return (
    <div>
      <h2>{title}</h2>
      <Gallery photos={photos} error={error} />
    </div>
  );
};
