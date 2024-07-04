const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  username: { type: String },
});

const user = model("user", userSchema);

module.exports = user;
