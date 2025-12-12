const asyncHandler = require("express-async-handler");
const { pool } = require("../config/dbConn");

// @desc dohvati odredeni dvd
// @route GET /dvd/:id

const getDvd = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT
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
    WHERE d.dvd_id = $1;
  `;
  const result = await pool.query(query, [id]);
  const dvd = result.rows[0];

  if (dvd) {
    res
      .status(200)
      .json({ status: "OK", message: "Fetched DVD object!", data: dvd });
  } else {
    res.status(404).send({
      status: "NOT_FOUND",
      message: "DVD with provided id does not exist!",
    });
  }
});

module.exports = { getDvd };
