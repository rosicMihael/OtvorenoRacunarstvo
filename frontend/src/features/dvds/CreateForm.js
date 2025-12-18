import React from "react";
import { useState } from "react";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

const CreateForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    naziv: "",
    gradska_cetvrt: "",
    email: "",
    telefon: "",
    web_stranica: "",
    oib: "",
    godina_osnutka: "",
    broj_clanova: "",
    adresa: {
      ulica: "",
      postanski_broj: "",
      grad: "",
    },
    vodstvo: {
      predsjednik: { ime: "", prezime: "", kontakt: "" },
      zapovjednik: { ime: "", prezime: "", kontakt: "" },
      tajnik: { ime: "", prezime: "", kontakt: "" },
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const keys = name.split(".");

      setFormData((prev) => {
        const updated = { ...prev };
        let current = updated;

        for (let i = 0; i < keys.length - 1; i++) {
          current[keys[i]] = { ...current[keys[i]] };
          current = current[keys[i]];
        }

        current[keys[keys.length - 1]] = value;
        return updated;
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post("/dvdi", formData)
      .then((response) => {
        console.log(response.data.status);
        console.log(response.data.message);
        setFormData({
          naziv: "",
          gradska_cetvrt: "",
          email: "",
          telefon: "",
          web_stranica: "",
          oib: "",
          godina_osnutka: "",
          broj_clanova: "",
          adresa: {
            ulica: "",
            postanski_broj: "",
            grad: "",
          },
          vodstvo: {
            predsjednik: { ime: "", prezime: "", kontakt: "" },
            zapovjednik: { ime: "", prezime: "", kontakt: "" },
            tajnik: { ime: "", prezime: "", kontakt: "" },
          },
        });
        navigate("/dvdi");
      })
      .catch((error) => {
        console.log(error.response.data.status);
        console.log(error.response.data.message);
      });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form-title">Dodajte novi DVD</h2>
      <div className="form-section">
        <div className="form-left">
          <input
            name="naziv"
            placeholder="Naziv DVD-a"
            value={formData.naziv}
            onChange={handleChange}
            required
          />
          <input
            name="gradska_cetvrt"
            placeholder="Gradska četvrt"
            value={formData.gradska_cetvrt}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            name="telefon"
            placeholder="Telefon"
            value={formData.telefon}
            onChange={handleChange}
            required
          />
          <input
            name="web_stranica"
            placeholder="Web stranica"
            value={formData.web_stranica}
            onChange={handleChange}
            required
          />
          <input
            name="oib"
            placeholder="OIB"
            value={formData.oib}
            onChange={handleChange}
            required
            minLength={11}
            maxLength={11}
          />
          <input
            name="godina_osnutka"
            placeholder="Godina osnutka"
            value={formData.godina_osnutka}
            onChange={handleChange}
            required
          />
          <input
            name="broj_clanova"
            placeholder="Broj članova"
            value={formData.broj_clanova}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-right">
          <div className="form-adresa">
            <h3>Adresa</h3>
            <div className="form-adresa-inputs">
              <input
                name="adresa.ulica"
                placeholder="Ulica"
                value={formData.adresa.ulica}
                onChange={handleChange}
                required
              />
              <input
                name="adresa.postanski_broj"
                placeholder="Poštanski broj"
                value={formData.adresa.postanski_broj}
                onChange={handleChange}
                required
              />
              <input
                name="adresa.grad"
                placeholder="Grad"
                value={formData.adresa.grad}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-vodstvo">
            <h3>Vodstvo</h3>
            <div className="form-vodstvo-inputs">
              <p>Predjsednik:</p>
              <input
                name="vodstvo.predsjednik.ime"
                placeholder="Ime"
                value={formData.vodstvo.predsjednik.ime}
                onChange={handleChange}
                required
              />
              <input
                name="vodstvo.predsjednik.prezime"
                placeholder="Prezime"
                value={formData.vodstvo.predsjednik.prezime}
                onChange={handleChange}
                required
              />
              <input
                name="vodstvo.predsjednik.kontakt"
                placeholder="Kontakt"
                value={formData.vodstvo.predsjednik.kontakt}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-vodstvo-inputs">
              <p>Zapovjednik:</p>
              <input
                name="vodstvo.zapovjednik.ime"
                placeholder="Ime"
                value={formData.vodstvo.zapovjednik.ime}
                onChange={handleChange}
                required
              />
              <input
                name="vodstvo.zapovjednik.prezime"
                placeholder="Prezime"
                value={formData.vodstvo.zapovjednik.prezime}
                onChange={handleChange}
                required
              />
              <input
                name="vodstvo.zapovjednik.kontakt"
                placeholder="Kontakt"
                value={formData.vodstvo.zapovjednik.kontakt}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-vodstvo-inputs">
              <p>Tajnik:</p>
              <input
                name="vodstvo.tajnik.ime"
                placeholder="Ime"
                value={formData.vodstvo.tajnik.ime}
                onChange={handleChange}
                required
              />
              <input
                name="vodstvo.tajnik.prezime"
                placeholder="Prezime"
                value={formData.vodstvo.tajnik.prezime}
                onChange={handleChange}
                required
              />
              <input
                name="vodstvo.tajnik.kontakt"
                placeholder="Kontakt"
                value={formData.vodstvo.tajnik.kontakt}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
      </div>
      <button type="submit" className="form-btn">
        Spremi DVD
      </button>
    </form>
  );
};

export default CreateForm;
