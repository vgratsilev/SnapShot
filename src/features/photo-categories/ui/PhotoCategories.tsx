import { NavLink } from "react-router-dom";
import { CATEGORIES } from "../model/categories";

/**
 * Navigation between the curated category pages.
 */
export const PhotoCategories = () => {
  return (
    <nav className="main-nav">
      <ul>
        {CATEGORIES.map((category) => (
          <li key={category.path}>
            <NavLink to={category.path}>{category.label}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
