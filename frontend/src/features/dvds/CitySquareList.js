import React from "react";
import { useState, useEffect } from "react";
import AlertPopUp from "../../components/AlertPopUp";
import api from "../../api/api";

const CitySquareList = () => {
  const [citySquare, setCitySquare] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get(`/dvdi/gradska_cetvrt`)
      .then((response) => {
        setCitySquare(response.data.response);
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
  }, []);

  if (loading) {
    return <p className="loader">Učitavanje gradskih četvrti...</p>;
  }

  if (error) {
    return <AlertPopUp status={error.status} message={error.message} />;
  }
  return (
    <div className="dvd-container">
      <h1 className="dvd-title">Sve pokrivene gradske četvrti</h1>
      <div className="dvd-card">
        {citySquare.map((quarter, index) => (
          <div key={index} className="dvd-section">
            <h2>{quarter.naziv}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CitySquareList;
