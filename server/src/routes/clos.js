const express = require("express");
const router = express.Router();

const closController = require("../app/controllers/CLOsController");
router.get("/", closController.index);

module.exports = router;
