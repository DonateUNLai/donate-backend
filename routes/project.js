const express = require("express");
const router = express.Router();
const { authorization } = require("../middleware/authorization");
const projectService = require("../services/project");



router.get("/", projectService.getProjects);
router.post("/",[authorization], projectService.addProject);


module.exports = router;