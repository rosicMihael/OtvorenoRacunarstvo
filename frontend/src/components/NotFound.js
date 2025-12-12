import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="nf-container">
      <h1 className="nf-title">404 – Stranica nije pronađena</h1>
      <p className="nf-text">
        Ups! Traženi sadržaj ne postoji ili je premješten.
      </p>

      <button className="nf-button" onClick={() => navigate(-1)}>
        Vrati se natrag
      </button>
    </div>
  );
};

export default NotFound;
