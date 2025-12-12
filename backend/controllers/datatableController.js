const asyncHandler = require("express-async-handler");
const getDvdsData = require("../services/dvdService");

// @desc dohvati sve dvd-e
// @route GET /datatable

const getDvds = asyncHandler(async (req, res) => {
  const dvds = await getDvdsData(req.query);
  res.json(dvds);
});

module.exports = getDvds;
