const { pool } = require("../config/dbConn");
const asyncHandler = require("express-async-handler");

// @desc dohvati sve dvd-e
// @route GET /datatable

const getDvds = asyncHandler(async (req, res) => {
  const query = `SELECT
  d.dvd_id,
  d.naziv,
  json_build_object(
    'ulica', a.ulica,
    'postanski_broj', a.postanski_broj,
    'grad', a.grad
  ) AS adresa,
  g.naziv AS gradska_cetvrt,
  d.email,
  d.telefon,
  d.web_stranica,
  d.oib AS OIB,
  (
    SELECT json_agg(
      json_build_object(
        'uloga', v.uloga,
        'ime', v.ime,
        'prezime', v.prezime,
        'kontakt', v.kontakt
      )
      ORDER BY v.vodstvo_id
    )
    FROM vodstvo v
    WHERE v.dvd_id = d.dvd_id
  ) AS vodstvo,
  d.godina_osnutka,
  d.broj_clanova
  FROM dvd d
  JOIN adresa a ON d.adresa_id = a.adresa_id
  JOIN gradska_cetvrt g ON d.gradska_cetvrt_id = g.gradska_cetvrt_id
  ORDER BY d.dvd_id`;

  const result = await pool.query(query);
  const dvds = result.rows;

  if (!dvds?.length) {
    return res.status(400).json({ message: "DVD-i nisu pronađeni!" });
  }
  res.json(dvds);
});

module.exports = getDvds;
