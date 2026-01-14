import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <nav className="navbar">
      <Link to="/">Naslovna stranica</Link>
      <div className="navLinksRight">
        <Link to="/dvdi">Lista DVD-a</Link>
        <Link to="/dvdi/novi">Dodaj novi DVD</Link>
        <Link to="http://localhost:3500/openapi">Pregledaj OpenApi</Link>
        {!isAuthenticated && (
          <button className="nav-btn" onClick={() => loginWithRedirect()}>
            Prijava
          </button>
        )}
        {isAuthenticated && (
          <>
            <Link to="/profile">Korisnički profil</Link>
            <button className="nav-btn" onClick={logout}>
              Odjava
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
