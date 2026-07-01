export const CATEGORIES = [
  {
    term: "mountain",
    path: "/mountain",
    label: "Mountain",
    title: "Mountain Pictures"
  },
  {
    term: "beach",
    path: "/beach",
    label: "Beaches",
    title: "Beach Pictures"
  },
  {
    term: "bird",
    path: "/bird",
    label: "Birds",
    title: "Bird Pictures"
  },
  {
    term: "food",
    path: "/food",
    label: "Food",
    title: "Food Pictures"
  }
] as const;

export type Category = (typeof CATEGORIES)[number];
export type CategoryTerm = Category["term"];

export const getCategoryByTerm = (term: string) =>
  CATEGORIES.find((category) => category.term === term);
