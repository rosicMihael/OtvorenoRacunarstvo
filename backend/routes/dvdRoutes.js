const express = require("express");
const router = express.Router();
const dvdController = require("../controllers/dvdController");

router.route("/").get(dvdController.getDvds);
router.route("/gradska_cetvrt").get(dvdController.getCitySquares);
router.route("/email").get(dvdController.getEmails);
router.route("/web_stranica").get(dvdController.getWebPages);
router.route("/novi").post(dvdController.createDvd);
router
  .route("/id/:id")
  .get(dvdController.getDvd)
  .delete(dvdController.deleteDvd);
router.route("/uredi/:id").patch(dvdController.editDvd);

module.exports = router;
