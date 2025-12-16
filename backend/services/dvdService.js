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

module.exports = { getDvdsData };
