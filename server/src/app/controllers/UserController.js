const User = require("../models/User");
const { multipleMongooseToObject } = require("../../util/mongoose");

class UserController {
  //GET ALL USERS
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  //DELETE USER
  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json(`Deleted user: ${user.username} successfully`);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new UserController();
