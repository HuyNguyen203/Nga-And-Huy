const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");
const Schema = mongoose.Schema;

const ELOs = new Schema(
  {
    maELO: { type: String, default: "", maxLenght: 255, require: true },
    eloTiengViet: { type: String, default: "", maxLenght: 255, require: true },
    eloTiengAnh: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

mongoose.plugin(slug);
ELOs.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });
module.exports = mongoose.model("elos", ELOs);
