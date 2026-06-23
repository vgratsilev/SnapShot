import React from "react";

const NoImages = ({
  title = "No Images Found",
  message = "Please try a different search term"
}) => (
  <div>
    <h2>{title}</h2>
    <p>{message}</p>
  </div>
);

export default NoImages;
