import React from "react";
import { useState, useEffect } from "react";
import AlertPopUp from "../../components/AlertPopUp";
import api from "../../api/api";

const WebPageList = () => {
  const [webPages, setWebPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get(`/dvdi/web_stranica`)
      .then((response) => {
        setWebPages(response.data.response);
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
    return <p className="loader">Učitavanje web stranica DVD-a...</p>;
  }

  if (error) {
    return <AlertPopUp status={error.status} message={error.message} />;
  }
  return (
    <div className="dvd-container">
      <h1 className="dvd-title">Sve web stranice DVD-a</h1>
      <div className="dvd-card">
        {webPages.map((webPage, index) => (
          <div key={index} className="dvd-section">
            <a href={webPage.web_stranica}>{webPage.web_stranica}</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebPageList;
