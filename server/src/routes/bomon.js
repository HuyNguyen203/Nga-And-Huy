const express = require("express");
const router = express.Router();

const bomonController = require("../app/controllers/BoMonController");
router.get("/", bomonController.index);

module.exports = router;
