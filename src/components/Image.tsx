interface ImageProps {
  url: string;
  title: string;
}

const Image = ({ url, title }: ImageProps) => (
  <li>
    <img src={url} alt={title} />
  </li>
);

export default Image;
