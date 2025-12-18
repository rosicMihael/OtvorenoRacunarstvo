const express = require("express");
const router = express.Router();
const dvdController = require("../controllers/dvdController");

router.route("/").get(dvdController.getDvds).post(dvdController.createDvd);
router.route("/gradske_cetvrti").get(dvdController.getCitySquares);
router.route("/emailovi").get(dvdController.getEmails);
router.route("/web_stranice").get(dvdController.getWebPages);
router
  .route("/:id")
  .get(dvdController.getDvd)
  .delete(dvdController.deleteDvd)
  .put(dvdController.editDvd);

module.exports = router;
