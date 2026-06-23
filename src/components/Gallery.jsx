import React from "react";
import NoImages from "./NoImages";
import Image from "./Image";

const Gallery = ({ data }) => {
  if (data.length === 0) {
    return <NoImages />;
  }

  const images = data.map(image => {
    const { server, id, secret, title } = image;
    // Current Flickr image URL format. The legacy `farm{N}.staticflickr.com`
    // host still resolves, but `live.staticflickr.com` is the preferred,
    // farm-independent format documented by the Flickr API.
    // https://www.flickr.com/services/api/misc.urls.html
    const url = `https://live.staticflickr.com/${server}/${id}_${secret}_m.jpg`;

    return <Image url={url} key={id} title={title} />;
  });

  return (
    <div>
      <ul>{images}</ul>
    </div>
  );
};

export default Gallery;
