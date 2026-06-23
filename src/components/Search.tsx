import { useParams } from "react-router-dom";
import Container from "./Container";

const Search = () => {
  const { searchInput = "" } = useParams();
  const term = decodeURIComponent(searchInput);

  return (
    <div>
      <h2>{term} Images</h2>
      <Container searchTerm={term} />
    </div>
  );
};

export default Search;
