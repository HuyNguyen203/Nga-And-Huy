const express = require("express");
const router = express.Router();
const userController = require("../app/controllers/UserController");
const middlewareController = require("../app/controllers/MiddlewareController");
//Get all users
router.get(
  "/",
  middlewareController.verifyTokenAndAdminAuth,
  userController.getAllUsers
);
//Delete user
router.delete(
  "/:id",
  middlewareController.verifyTokenAndAdminAuth,
  userController.deleteUser
);
router.get("/:id", userController.getUserRoles);
module.exports = router;
