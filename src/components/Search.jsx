import React from "react";
import { useParams } from "react-router-dom";
import Container from "./Container";

const Search = () => {
  const { searchInput = "" } = useParams();

  return (
    <div>
      <h2>{searchInput} Images</h2>
      <Container searchTerm={searchInput} />
    </div>
  );
};

export default Search;
