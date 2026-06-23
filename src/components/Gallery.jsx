import React from "react";
import NoImages from "./NoImages";
import Image from "./Image";

const Gallery = ({ data }) => {
  if (data.length === 0) {
    return <NoImages />;
  }

  const images = data.map(image => {
    const { farm, server, id, secret, title } = image;
    const url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_m.jpg`;

    return <Image url={url} key={id} title={title} />;
  });

  return (
    <div>
      <ul>{images}</ul>
    </div>
  );
};

export default Gallery;
