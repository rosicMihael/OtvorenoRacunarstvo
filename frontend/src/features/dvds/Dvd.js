import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AlertPopUp from "../../components/AlertPopUp";

const Dvd = () => {
  const { id } = useParams();
  const [dvd, setDvd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3500/dvd/" + id)
      .then((response) => {
        setDvd(response.data.data);
        setError(null);
      })
      .catch((error) => {
        console.error(error.response.data.message);
        setError({
          status: error.response.data.status,
          message: error.response.data.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Učitavanje detalja DVD-a...</p>;
  }

  if (error) {
    return <AlertPopUp status={error.status} message={error.message} />;
  }

  if (!dvd) {
    return <p>Dvd nije pronađen.</p>;
  }

  return (
    <div className="dvd-container">
      <h1 className="dvd-title">{dvd.naziv}</h1>

      <div className="dvd-card">
        <div className="dvd-section">
          <h2>Adresa</h2>
          <p>{`${dvd.adresa.ulica}, ${dvd.adresa.postanski_broj} ${dvd.adresa.grad}`}</p>
        </div>

        <div className="dvd-section">
          <h2>Gradska četvrt</h2>
          <p>{dvd.gradska_cetvrt}</p>
        </div>

        <div className="dvd-section">
          <h2>Email</h2>
          <p>{dvd.email}</p>
        </div>

        <div className="dvd-section">
          <h2>Telefon</h2>
          <p>{dvd.telefon}</p>
        </div>

        <div className="dvd-section">
          <h2>Web stranica</h2>
          <p>
            <a href={dvd.web_stranica}>{dvd.web_stranica}</a>
          </p>
        </div>

        <div className="dvd-section">
          <h2>OIB</h2>
          <p>{dvd.oib}</p>
        </div>

        <div className="dvd-section">
          <h2>Godina osnutka</h2>
          <p>{dvd.godina_osnutka}</p>
        </div>

        <div className="dvd-section">
          <h2>Broj članova</h2>
          <p>{dvd.broj_clanova}</p>
        </div>

        <div className="dvd-section">
          <h2>Vodstvo</h2>
          <ul className="dvd-list">
            {dvd.vodstvo.map((v, i) => (
              <li key={i}>
                {`${v.uloga}: ${v.ime} ${v.prezime} (${v.kontakt})`}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dvd;
