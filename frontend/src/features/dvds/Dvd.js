import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import AlertPopUp from "../../components/AlertPopUp";
import api from "../../api/api";
import { FaTrashCan, FaPenToSquare } from "react-icons/fa6";

const Dvd = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [dvd, setDvd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get(`/dvdi/${id}`)
      .then((response) => {
        console.log(response.data.status);
        console.log(response.data.message);
        setDvd(response.data.response);
        setError(null);
      })
      .catch((error) => {
        console.error(error.response.data.status);
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

  const onDeleteClicked = () => {
    api
      .delete(`/dvdi/${id}`)
      .then((response) => {
        console.log(response.data.status);
        console.log(response.data.message);
        navigate("/dvdi");
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setError({
          status: error.response.data.status,
          message: error.response.data.message,
        });
      });
  };

  if (loading) {
    return <p className="loader">Učitavanje detalja DVD-a...</p>;
  }

  if (error) {
    return <AlertPopUp status={error.status} message={error.message} />;
  }

  return (
    <div className="dvd-container">
      <div className="dvd-delete-edit-buttons">
        <button
          title="Izbriši DVD"
          type="button"
          onClick={onDeleteClicked}
          className="delete-btn"
        >
          <FaTrashCan size={20} />
        </button>
        <Link to={`/dvdi/edit/${id}`} className="edit-btn" title="Uredi DVD">
          <FaPenToSquare size={20} />
        </Link>
      </div>
      <h1 className="dvd-title">{dvd.naziv}</h1>

      <div className="dvd-card">
        <div className="dvd-section">
          <h2>Adresa</h2>
          <p>{`${dvd.adresa.ulica}, ${dvd.adresa.postanski_broj} ${dvd.adresa.grad}`}</p>
        </div>

        <div className="dvd-section">
          <h2>Gradska četvrt</h2>
          <p>{dvd.gradska_cetvrt.naziv}</p>
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
            {Object.entries(dvd.vodstvo).map(([uloga, osoba]) => (
              <li key={uloga}>
                {`${uloga}: ${osoba.ime} ${osoba.prezime} (${osoba.kontakt})`}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dvd;
