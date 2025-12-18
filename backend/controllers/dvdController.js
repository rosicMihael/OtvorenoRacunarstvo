const asyncHandler = require("express-async-handler");
const {
  getDvdsData,
  getOrCreateQuarter,
  insertAddress,
  insertDvd,
  insertVodstvo,
} = require("../services/dvdService");
const { pool } = require("../config/dbConn");

// @desc dohvati sve dvd-e
// @route GET /dvdi

const getDvds = asyncHandler(async (req, res) => {
  const dvds = await getDvdsData(req.query);

  if (!dvds) {
    res.status(404).send({
      status: "NOT FOUND",
      message: "No DVDs found!",
    });
  } else {
    res
      .status(200)
      .json({ status: "OK", message: "Fetched DVDs data!", response: dvds });
  }
});

// @desc dohvati odredeni dvd
// @route GET /dvdi/:id

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
      .json({ status: "OK", message: "Fetched DVD object!", response: dvd });
  } else {
    res.status(404).send({
      status: "NOT FOUND",
      message: "DVD with provided id does not exist!",
    });
  }
});

// @desc dohvati sve gradske četvrti koje su pokrivene
// @route GET /dvdi/gradska_cetvrt/

const getCitySquares = asyncHandler(async (req, res) => {
  const query = `
    SELECT * FROM gradska_cetvrt;
  `;

  const result = await pool.query(query);

  const city_squares = result.rows;

  if (city_squares) {
    res.status(200).json({
      status: "OK",
      message: "Fetched city squares!",
      response: city_squares,
    });
  } else {
    res.status(404).send({
      status: "NOT FOUND",
      message: "No city squares found!",
    });
  }
});

// @desc dohvati sve emailove DVD-a
// @route GET /dvdi/email

const getEmails = asyncHandler(async (req, res) => {
  const query = `
    SELECT email FROM dvd;
  `;

  const result = await pool.query(query);

  const emails = result.rows;

  if (emails) {
    res.status(200).json({
      status: "OK",
      message: "Fetched city squares!",
      response: emails,
    });
  } else {
    res.status(404).send({
      status: "NOT FOUND",
      message: "No city squares found!",
    });
  }
});

// @desc dohvati sve web stranice DVD-a
// @route GET /dvdi/web_stranica

const getWebPages = asyncHandler(async (req, res) => {
  const query = `
    SELECT web_stranica FROM dvd;
  `;

  const result = await pool.query(query);

  const webPages = result.rows;

  if (webPages) {
    res.status(200).json({
      status: "OK",
      message: "Fetched city squares!",
      response: webPages,
    });
  } else {
    res.status(404).send({
      status: "NOT FOUND",
      message: "No city squares found!",
    });
  }
});

// @desc dodaj novi DVD u bazu
// @route POST /dvdi/novi

const createDvd = asyncHandler(async (req, res) => {
  const { formData } = req.body;

  try {
    await pool.query("BEGIN");

    const quarter = formData.gradska_cetvrt;
    const quarterId = await getOrCreateQuarter(quarter);

    const address = formData.adresa;
    const addressId = await insertAddress(address);

    const dvdData = {
      naziv: formData.naziv,
      oib: formData.oib,
      adresa_id: addressId,
      gradska_cetvrt_id: quarterId,
      email: formData.email,
      telefon: formData.telefon,
      web_stranica: formData.web_stranica,
      godina_osnutka: formData.godina_osnutka,
      broj_clanova: formData.broj_clanova,
    };

    const dvdId = await insertDvd(dvdData);

    const vodstvoData = {
      dvd_id: dvdId,
      predsjednik: formData.vodstvo.predsjednik,
      zapovjednik: formData.vodstvo.zapovjednik,
      tajnik: formData.vodstvo.tajnik,
    };

    await insertVodstvo(vodstvoData);

    await pool.query("COMMIT");

    res.status(200).json({
      status: "OK",
      message: "DVD created!",
    });
  } catch (error) {
    await pool.query("ROLLBACK");
    res
      .status(500)
      .send({ status: "DATABASE ERROR", message: "DVD not created!" });
  }
});

const deleteDvd = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("BEGIN");

    await pool.query(`DELETE FROM vodstvo WHERE dvd_id = $1`, [id]);

    const { rows } = await pool.query(
      `SELECT adresa_id FROM dvd WHERE dvd_id = $1`,
      [id]
    );
    const addressId = rows[0]?.adresa_id;

    await pool.query(`DELETE FROM dvd WHERE dvd_id = $1`, [id]);

    if (addressId) {
      await pool.query(`DELETE FROM adresa WHERE adresa_id = $1`, [addressId]);
    }

    await pool.query("COMMIT");

    res.status(200).json({
      status: "OK",
      message: "DVD deleted!",
    });
  } catch (error) {
    await pool.query("ROLLBACK");
    res
      .status(500)
      .send({ status: "DATABASE ERROR", message: "DVD not deleted!" });
  }
});

module.exports = {
  getDvds,
  getDvd,
  getCitySquares,
  getEmails,
  getWebPages,
  createDvd,
  deleteDvd,
};
