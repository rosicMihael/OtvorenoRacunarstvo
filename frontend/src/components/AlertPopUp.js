import React from "react";
import { useNavigate } from "react-router-dom";

const AlertPopUp = ({ status, message }) => {
  const navigate = useNavigate();
  const onClose = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="alert-overlay">
      <div
        className={"alert-box alert-error"}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>{status}</h2>
        <p className="alert-message">{message}</p>
        <button className="alert-button" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default AlertPopUp;
