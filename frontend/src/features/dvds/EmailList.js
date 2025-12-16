import React from "react";
import { useState, useEffect } from "react";
import AlertPopUp from "../../components/AlertPopUp";
import api from "../../api/api";

const EmailList = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get(`/dvdi/email`)
      .then((response) => {
        setEmails(response.data.response);
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
    return <p className="loader">Učitavanje mailova DVD-a...</p>;
  }

  if (error) {
    return <AlertPopUp status={error.status} message={error.message} />;
  }
  return (
    <div className="dvd-container">
      <h1 className="dvd-title">Svi mailovi DVD-a</h1>
      <div className="dvd-card">
        {emails.map((email, index) => (
          <div key={index} className="dvd-section">
            <h2>{email.email}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailList;
