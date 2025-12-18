const { pool } = require("../config/dbConn");

const getDvdsData = async ({
  selectedField,
  searchText,
  sortField,
  sortOrder = "ASC",
}) => {
  const allFields = {
    naziv: ["d.naziv"],
    adresa: ["a.ulica", "a.postanski_broj::text", "a.grad"],
    gradskaCetvrt: ["g.naziv"],
    email: ["d.email"],
    telefon: ["d.telefon"],
    webStranica: ["d.web_stranica"],
    OIB: ["d.oib"],
    godinaOsnutka: ["d.godina_osnutka::text"],
    brojClanova: ["d.broj_clanova::text"],
  };

  const fields = allFields[selectedField] || [];
  let whereClause = "";
  let orderClause = "";
  let values = [];

  if (searchText && fields.length > 0) {
    const conditions = fields.map((field, i) => `${field} ILIKE $${i + 1}`);
    whereClause = `WHERE (${conditions.join(" OR ")})`;
    values = fields.map(() => `%${searchText}%`);
  }

  if (searchText && selectedField === "all") {
    const allFieldsFlat = Object.values(allFields).flat();

    const conditions = allFieldsFlat.map(
      (field, i) => `${field} ILIKE $${i + 1}`
    );
    whereClause = `WHERE (${conditions.join(" OR ")})`;

    values = allFieldsFlat.map(() => `%${searchText}%`);
  }

  if (allFields[sortField]) {
    orderClause = `ORDER BY ${
      allFields[sortField][0]
    } ${sortOrder.toUpperCase()}`;
  } else {
    orderClause = `ORDER BY d.dvd_id ASC`;
  }

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
    ${whereClause}
    ${orderClause};
  `;

  const result = await pool.query(query, values);
  return result.rows;
};

const getOrCreateQuarter = async (naziv) => {
  const quarter = await pool.query(
    `SELECT gradska_cetvrt_id FROM gradska_cetvrt WHERE naziv = $1;`,
    [naziv]
  );

  if (quarter.rows.length > 0) {
    return quarter.rows[0].gradska_cetvrt_id;
  }

  const newQuarter = await pool.query(
    `INSERT INTO gradska_cetvrt (naziv)
     VALUES ($1)
     RETURNING gradska_cetvrt_id`,
    [naziv]
  );

  return newQuarter.rows[0].gradska_cetvrt_id;
};

const insertAddress = async (address) => {
  const { ulica, postanski_broj, grad } = address;

  const query = `INSERT INTO adresa (ulica, postanski_broj,  grad)
  VALUES ($1, $2, $3)
  RETURNING adresa_id`;

  const newAddress = await pool.query(query, [ulica, postanski_broj, grad]);

  return newAddress.rows[0].adresa_id;
};

const insertDvd = async (dvdData) => {
  const {
    naziv,
    oib,
    adresa_id,
    gradska_cetvrt_id,
    email,
    telefon,
    web_stranica,
    godina_osnutka,
    broj_clanova,
  } = dvdData;

  const newDvd = await pool.query(
    `
    INSERT INTO dvd (naziv, oib, adresa_id, gradska_cetvrt_id, email, telefon, web_stranica, godina_osnutka, broj_clanova)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
    RETURNING dvd_id
    `,
    [
      naziv,
      oib,
      adresa_id,
      gradska_cetvrt_id,
      email,
      telefon,
      web_stranica,
      godina_osnutka,
      broj_clanova,
    ]
  );
  return newDvd.rows[0].dvd_id;
};

const insertVodstvo = async (vodstvoData) => {
  const { dvd_id, predsjednik, zapovjednik, tajnik } = vodstvoData;

  const query = `
    INSERT INTO vodstvo (dvd_id, uloga, ime, prezime, kontakt)
    VALUES
      ($1, 'predsjednik', $2, $3, $4),
      ($1, 'zapovjednik', $5, $6, $7),
      ($1, 'tajnik', $8, $9, $10)
  `;

  await pool.query(query, [
    dvd_id,
    predsjednik.ime,
    predsjednik.prezime,
    predsjednik.kontakt,
    zapovjednik.ime,
    zapovjednik.prezime,
    zapovjednik.kontakt,
    tajnik.ime,
    tajnik.prezime,
    tajnik.kontakt,
  ]);
};

const updateDvd = async (
  id,
  naziv,
  oib,
  adresa_id,
  gradska_cetvrt_id,
  email,
  telefon,
  web_stranica,
  godina_osnutka,
  broj_clanova
) => {
  const query = `
  UPDATE dvd
      SET
        naziv = $1,
        oib = $2,
        adresa_id = $3,
        gradska_cetvrt_id = $4,
        email = $5,
        telefon = $6,
        web_stranica = $7,
        godina_osnutka = $8,
        broj_clanova = $9
      WHERE dvd_id = $10;
    `;

  await pool.query(query, [
    naziv,
    oib,
    adresa_id,
    gradska_cetvrt_id,
    email,
    telefon,
    web_stranica,
    godina_osnutka,
    broj_clanova,
    id,
  ]);
};

const updateAddress = async (adresa) => {
  const { adresa_id, ulica, postanski_broj, grad } = adresa;

  const query = `
      UPDATE adresa
      SET ulica = $1, postanski_broj = $2, grad = $3
      WHERE adresa_id = $4;
    `;

  await pool.query(query, [ulica, postanski_broj, grad, adresa_id]);
};

const updateVodstvo = async (id, vodstvo) => {
  await pool.query(`DELETE FROM vodstvo WHERE dvd_id = $1`, [id]);

  const query = `
      INSERT INTO vodstvo (dvd_id, uloga, ime, prezime, kontakt)
      VALUES
        ($1, 'predsjednik', $2, $3, $4),
        ($1, 'zapovjednik', $5, $6, $7),
        ($1, 'tajnik', $8, $9, $10)
    `;

  await pool.query(query, [
    id,
    vodstvo.predsjednik.ime,
    vodstvo.predsjednik.prezime,
    vodstvo.predsjednik.kontakt,
    vodstvo.zapovjednik.ime,
    vodstvo.zapovjednik.prezime,
    vodstvo.zapovjednik.kontakt,
    vodstvo.tajnik.ime,
    vodstvo.tajnik.prezime,
    vodstvo.tajnik.kontakt,
  ]);
};

module.exports = {
  getDvdsData,
  getOrCreateQuarter,
  insertAddress,
  insertDvd,
  insertVodstvo,
  updateDvd,
  updateAddress,
  updateVodstvo,
};
