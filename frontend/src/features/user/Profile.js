import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function Profile() {
  const { user, isLoading, error } = useAuth0();

  if (isLoading) {
    return <div className="loader">Učitavanje profila...</div>;
  }

  if (error) {
    return (
      <div className="error">
        Greška pri učitavanju profila: {error.message}
      </div>
    );
  }

  return (
    <div className="profile-page">
      <h1>Korisnički profil</h1>
      {user ? (
        <div className="profile-info">
          <div className="details">
            <p>
              <strong>Ime:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Nickname:</strong> {user.nickname}
            </p>
          </div>
          <img src={user.picture} alt="Profilna slika" />
        </div>
      ) : (
        <p>Nema dostupnih podataka.</p>
      )}
    </div>
  );
}
