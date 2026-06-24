import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import searchIconUrl from "../assets/search-icon.svg";

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
        <img
          alt=""
          aria-hidden="true"
          className="search-button-icon"
          src={searchIconUrl}
        />
      </button>
    </form>
  );
};
