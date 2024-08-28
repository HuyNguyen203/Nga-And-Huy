const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = new Schema(
  {
    username: {
      type: String,
      required: true,
      minlegth: 6,
      maxlegth: 255,
      maxlegth: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      minlegth: 10,
      maxlegth: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlegth: 6,
      maxlegth: 1024,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", User);
