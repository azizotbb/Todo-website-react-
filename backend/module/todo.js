const { Schema, model } = require("mongoose");

const todoSchema = new Schema({
  title: String,
  isCompleted: Boolean,
});
const todo = model("todo", todoSchema);
module.exports = todo;
