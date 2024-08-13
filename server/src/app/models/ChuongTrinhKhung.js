const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");
const Schema = mongoose.Schema;

const ChuongTrinhKhung = new Schema({
  maNiemGiam: { type: String, default: "", maxLenght: 255, require: true },
  maChuyenNganh: { type: String, default: "", maxLenght: 255, require: true },
  khoaHoc: { type: String, default: "", maxLenght: 255, require: true },
});

mongoose.plugin(slug);
ChuongTrinhKhung.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});
module.exports = mongoose.model("chuongtrinhkhungs", ChuongTrinhKhung);
