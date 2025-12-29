import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Naslovna stranica</Link>
      <div className="navLinksRight">
        <Link to="/dvdi">Lista DVD-a</Link>
        <Link to="/dvdi/novi">Dodaj novi DVD</Link>
        <Link to="http://localhost:3500/openapi">Pregledj OpenApi</Link>
      </div>
    </nav>
  );
};

export default Navbar;
