const express = require("express");
const router = express.Router();
const MiddlewareController = require("../app/controllers/MiddlewareController");

const authController = require("../app/controllers/AuthController");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/refresh", authController.refreshToken);
router.post("/logout", MiddlewareController.verifyToken, authController.logout);

module.exports = router;
