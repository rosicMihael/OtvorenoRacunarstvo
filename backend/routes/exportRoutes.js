const express = require("express");
const router = express.Router();
const exportController = require("../controllers/exportController");

router.route("/json").get(exportController.exportDvdsToJSON);
router.route("/csv").get(exportController.exportDvdsToCSV);

module.exports = router;
