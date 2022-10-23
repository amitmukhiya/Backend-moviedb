const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    password1: { type: String, required: true },
  },
  { collection: "user-data" }
);
const model = mongoose.model("UserData", userSchema);
module.exports = model;
