import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Naslovna stranica</Link>
      <Link to="/datatable">Lista DVD-a</Link>
    </nav>
  );
};

export default Navbar;
