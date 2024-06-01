const express = require("express");
const router = express.Router();
const { authorization } = require("../middleware/authorization");
const donationService = require("../services/donation");



router.get("/:projectId", donationService.getAllDonors);
router.post("/",[authorization], donationService.addDonation);


module.exports = router;