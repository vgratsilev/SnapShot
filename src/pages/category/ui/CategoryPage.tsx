interface CategoryPageProps {
  searchTerm: string;
}

/**
 * Minimal presentational wrapper for a category page. The route config in
 * `app/ui/App.tsx` attaches the `loader` and renders `<RoutedGallery>` alongside
 * this heading.
 */
export const CategoryPage = ({ searchTerm }: CategoryPageProps) => (
  <h2>{searchTerm} Pictures</h2>
);
