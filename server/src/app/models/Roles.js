const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Roles = new Schema(
  {
    roleName: {
      type: String,
      required: true, // Tên vai trò, bắt buộc phải có
    },
    roleContent: {
      type: String,
      required: true, // Mô tả quyền của vai trò, bắt buộc phải có
    },
  },
  {
    timestamps: true, // Thêm các trường createdAt và updatedAt tự động
  }
);
module.exports = mongoose.model("roles", Roles);
