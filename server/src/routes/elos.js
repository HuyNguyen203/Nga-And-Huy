const express = require("express");
const router = express.Router();

const elosController = require("../app/controllers/ELOsController");
router.get("/", elosController.index);
router.get("/banganhxa", elosController.BangAnhXa);

module.exports = router;
