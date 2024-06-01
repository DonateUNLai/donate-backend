const express = require("express");
const router = express.Router();
const { authorization } = require("../middleware/authorization");
const allocationService = require("../services/allocation");



router.get("/:projectId", allocationService.getAllReceivers);
router.post("/",[authorization], allocationService.addReceiver);


module.exports = router;