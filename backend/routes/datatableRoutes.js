const express = require("express");
const router = express.Router();
const datatableController = require("../controllers/datatableController");

router.route("/").get(datatableController);

module.exports = router;
