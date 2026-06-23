import { type FormEvent } from "react";
import Form from "./Form";
import Navigation from "./Navigation";

interface HeaderProps {
  handleSubmit: (event: FormEvent<HTMLFormElement>, searchInput: string) => void;
}

const Header = ({ handleSubmit }: HeaderProps) => {
  return (
    <div>
      <h1>SnapShot</h1>
      <Form handleSubmit={handleSubmit} />
      <Navigation />
    </div>
  );
};

export default Header;
