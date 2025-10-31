const express = require("express");
const router = express.Router();
const dvdController = require("../controllers/dvdController");

router.route("/").get(dvdController);

module.exports = router;
