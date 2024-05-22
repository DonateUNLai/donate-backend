const express = require("express");
const router = express.Router();
const { authorization } = require("../middleware/authorization");
const userService = require("../services/user");



router.post("/nonce", userService.generateNonce);
router.post("/verify", userService.verifySign);
router.post("/profile",[authorization], userService.getProfile);


module.exports = router;