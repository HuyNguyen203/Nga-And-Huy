const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");
const Schema = mongoose.Schema;

const BoMon = new Schema(
  {
    maBoMon: { type: String, default: "", maxLenght: 255, require: true },
    tenBoMon: { type: String, default: "", maxLenght: 255, require: true },
    trangThai: { type: Boolean },
    truongBoMon: { type: Date },
    phoBoMon: { type: String, default: "", maxLenght: 255 },
  },
  {
    timestamps: true,
  }
);

mongoose.plugin(slug);
BoMon.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });
module.exports = mongoose.model("bomons", BoMon);
