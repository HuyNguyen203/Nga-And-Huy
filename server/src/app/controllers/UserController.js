const User = require("../models/User");
const GiangVien = require("../models/GiangVien");
const { multipleMongooseToObject } = require("../../util/mongoose");
const Roles = require("../models/Roles");

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

  //GET USER ROLES BY ID
  async getUserRoles(req, res) {
    try {
      const user = await User.findById(req.params.id, "username");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const giangVien = await GiangVien.findOne(
        { maGiangVien: user.username },
        "roles"
      );
      if (!giangVien) {
        return res.status(404).json({ message: "Giang vien not found" });
      }
      // const roles = giangVien.roles.map((id) => Roles.findById(id));
      const roles = await Promise.all(
        giangVien.roles.map((id) => Roles.findById(id))
      );
      res.status(200).json(roles);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  //GET ROLE USER CHOOSE
  async getRoleChoose(req, res) {
    try {
      const user = await User.findById(req.params.id);
      const { roleName } = req.body;
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.role = roleName;
      await user.save();
      res.status(200).json({
        message: "Role updated successfully",
        role: user.role,
        id: req.params.id,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new UserController();
