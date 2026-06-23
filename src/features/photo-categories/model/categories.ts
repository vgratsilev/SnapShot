/** The curated default categories shown in the header. */
export interface Category {
  readonly path: string;
  readonly label: string;
}

export const CATEGORIES: readonly Category[] = [
  { path: "/mountain", label: "Mountain" },
  { path: "/beach", label: "Beaches" },
  { path: "/bird", label: "Birds" },
  { path: "/food", label: "Food" }
];
