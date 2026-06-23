import React from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import PhotoContextProvider from "./context/PhotoContext";
import Header from "./components/Header";
import Item from "./components/Item";
import Search from "./components/Search";
import NotFound from "./components/NotFound";

const App = () => {
  const navigate = useNavigate();

  const handleSubmit = (event, searchInput) => {
    event.preventDefault();

    const nextSearch = searchInput.trim();
    if (!nextSearch) {
      return;
    }

    navigate(`/search/${encodeURIComponent(nextSearch)}`);
  };

  return (
    <PhotoContextProvider>
      <div className="container">
        <Header handleSubmit={handleSubmit} />
        <Routes>
          <Route path="/" element={<Navigate to="/mountain" replace />} />
          <Route path="/mountain" element={<Item searchTerm="mountain" />} />
          <Route path="/beach" element={<Item searchTerm="beach" />} />
          <Route path="/bird" element={<Item searchTerm="bird" />} />
          <Route path="/food" element={<Item searchTerm="food" />} />
          <Route path="/search/:searchInput" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </PhotoContextProvider>
  );
};

export default App;
