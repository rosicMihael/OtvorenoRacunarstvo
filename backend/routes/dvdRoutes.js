const express = require("express");
const router = express.Router();
const dvdController = require("../controllers/dvdController");

router.route("/:id").get(dvdController.getDvd);

module.exports = router;
