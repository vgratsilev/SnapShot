import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface SearchPhotosProps {
  /** Override for tests or controlled usage. Defaults to router navigation. */
  onSubmit?: (searchInput: string) => void;
}

/**
 * Free-text search input. On submit it navigates to `/search/<query>` (or calls
 * the optional `onSubmit`). The submit button is disabled until there is
 * non-whitespace input.
 */
export const SearchPhotos = ({ onSubmit }: SearchPhotosProps) => {
  const navigate = useNavigate();
  const [searchEntry, setSearchEntry] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchEntry(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = searchEntry.trim();
    if (!next) {
      return;
    }

    if (onSubmit) {
      onSubmit(next);
    } else {
      navigate(`/search/${encodeURIComponent(next)}`);
    }
    setSearchEntry("");
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <label className="is-hidden" htmlFor="search-photos-input">
        Search photos
      </label>
      <input
        id="search-photos-input"
        type="text"
        name="search"
        placeholder="Search..."
        onChange={handleChange}
        value={searchEntry}
      />
      <button
        type="submit"
        className={`search-button ${searchEntry.trim() ? "active" : ""}`}
        disabled={!searchEntry.trim()}
        aria-label="Search"
      >
        <svg height="32" width="32" aria-hidden="true">
          <path
            d="M19.427 21.427a8.5 8.5 0 1 1 2-2l5.585 5.585c.55.55.546 1.43 0 1.976l-.024.024a1.399 1.399 0 0 1-1.976 0l-5.585-5.585zM14.5 21a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13z"
            fill="#ffffff"
            fillRule="evenodd"
          />
        </svg>
      </button>
    </form>
  );
};
