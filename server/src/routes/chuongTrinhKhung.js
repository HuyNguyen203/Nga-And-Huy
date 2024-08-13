const express = require("express");
const router = express.Router();

const chuongTrinhKhungController = require("../app/controllers/ChuongTrinhKhungController");

router.get("/", chuongTrinhKhungController.index);
router.get("/:id", chuongTrinhKhungController.ChiTietNiemGiam);

module.exports = router;
