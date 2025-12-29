const asyncHandler = require("express-async-handler");
const { getDvdsData } = require("../services/dvdService");
const { Parser } = require("json2csv");

// @desc export u JSON format
// @route GET export/json
const exportDvdsToJSON = asyncHandler(async (req, res) => {
  const dvds = await getDvdsData(req.query);
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Content-Disposition", "attachment; filename=dvd.json");
  res.send(JSON.stringify(dvds, null, 2));
});

// @desc export u CSV format
// @route GET export/csv
const exportDvdsToCSV = asyncHandler(async (req, res) => {
  const dvds = await getDvdsData(req.query);

  const headers = [
    "Naziv",
    "Adresa",
    "Gradska četvrt",
    "Email",
    "Telefon",
    "Web stranica",
    "OIB",
    "Godina osnutka",
    "Broj članova",
    "Vodstvo",
  ];

  const rows = dvds.map((dvd) => ({
    Naziv: dvd.naziv,
    Adresa: `${dvd.adresa.ulica}, ${dvd.adresa.postanski_broj} ${dvd.adresa.grad}`,
    "Gradska četvrt": dvd.gradska_cetvrt,
    Email: dvd.email,
    Telefon: dvd.telefon,
    "Web stranica": dvd.web_stranica,
    OIB: dvd.oib,
    "Godina osnutka": dvd.godina_osnutka,
    "Broj članova": dvd.broj_clanova,
    Vodstvo: dvd.vodstvo
      .map((v) => `${v.uloga}: ${v.ime} ${v.prezime} (${v.kontakt})`)
      .join("; "),
  }));

  const json2csvParser = new Parser({ fields: headers });
  const csv = json2csvParser.parse(rows);

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=dvd.csv");
  res.send(csv);
});

module.exports = {
  exportDvdsToJSON,
  exportDvdsToCSV,
};
