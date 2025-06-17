import { Link } from "@tanstack/react-router";

export const Nav = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
  );
};
