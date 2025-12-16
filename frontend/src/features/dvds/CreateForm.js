import React from "react";
import { useState } from "react";
const emptyVodstvo = { uloga: "", ime: "", prezime: "", kontakt: "" };

const CreateForm = () => {
  const [form, setForm] = useState({
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
    vodstvo: [emptyVodstvo],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("adresa.")) {
      const key = name.split(".")[1];
      setForm({
        ...form,
        adresa: { ...form.adresa, [key]: value },
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleVodstvoChange = (index, field, value) => {
    const updated = [...form.vodstvo];
    updated[index][field] = value;
    setForm({ ...form, vodstvo: updated });
  };

  const addVodstvo = () => {
    setForm({ ...form, vodstvo: [...form.vodstvo, emptyVodstvo] });
  };

  const removeVodstvo = (index) => {
    setForm({
      ...form,
      vodstvo: form.vodstvo.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Dodaj DVD</h2>

      <input name="naziv" placeholder="Naziv DVD-a" onChange={handleChange} />
      <input
        name="gradska_cetvrt"
        placeholder="Gradska četvrt"
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <input name="telefon" placeholder="Telefon" onChange={handleChange} />
      <input
        name="web_stranica"
        placeholder="Web stranica"
        onChange={handleChange}
      />
      <input name="oib" placeholder="OIB" onChange={handleChange} />
      <input
        name="godina_osnutka"
        type="number"
        placeholder="Godina osnutka"
        onChange={handleChange}
      />
      <input
        name="broj_clanova"
        type="number"
        placeholder="Broj članova"
        onChange={handleChange}
      />

      <h3>Adresa</h3>
      <input name="adresa.ulica" placeholder="Ulica" onChange={handleChange} />
      <input
        name="adresa.postanski_broj"
        placeholder="Poštanski broj"
        onChange={handleChange}
      />
      <input name="adresa.grad" placeholder="Grad" onChange={handleChange} />

      <h3>Vodstvo</h3>
      {form.vodstvo.map((v, index) => (
        <div key={index} style={{ border: "1px solid #ccc", padding: 10 }}>
          <input
            placeholder="Uloga"
            value={v.uloga}
            onChange={(e) =>
              handleVodstvoChange(index, "uloga", e.target.value)
            }
          />
          <input
            placeholder="Ime"
            value={v.ime}
            onChange={(e) => handleVodstvoChange(index, "ime", e.target.value)}
          />
          <input
            placeholder="Prezime"
            value={v.prezime}
            onChange={(e) =>
              handleVodstvoChange(index, "prezime", e.target.value)
            }
          />
          <input
            placeholder="Kontakt"
            value={v.kontakt}
            onChange={(e) =>
              handleVodstvoChange(index, "kontakt", e.target.value)
            }
          />

          {form.vodstvo.length > 1 && (
            <button type="button" onClick={() => removeVodstvo(index)}>
              Ukloni
            </button>
          )}
        </div>
      ))}

      <button type="button" onClick={addVodstvo}>
        + Dodaj člana vodstva
      </button>

      <br />
      <button type="submit">Spremi DVD</button>
    </form>
  );
};

export default CreateForm;
