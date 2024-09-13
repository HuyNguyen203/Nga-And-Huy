const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");
const Schema = mongoose.Schema;

const GiangVien = new Schema(
  {
    maGiangVien: {
      type: String,
      required: true,
    },
    chucVu: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    ngaySinh: {
      type: Date,
    },
    soDienThoai: {
      type: String,
    },
    hoTen: {
      type: String,
      required: true,
    },
    trangThai: {
      type: Boolean,
      default: true,
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role", // Reference to a Role collection (if you have one)
      },
    ],
  },
  {
    timestamps: true,
  }
);

mongoose.plugin(slug);
GiangVien.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });
module.exports = mongoose.model("giangviens", GiangVien);
