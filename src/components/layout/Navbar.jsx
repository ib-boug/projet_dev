import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-black p-5 flex gap-5">
      <Link to="/" className="text-white hover:text-red-500">
        Home
      </Link>

      <Link to="/games" className="text-white hover:text-red-500">
        Games
      </Link>

      <Link to="/favorites" className="text-white hover:text-red-500">
        Favorites
      </Link>

    </nav>
  );
}

export default Navbar;