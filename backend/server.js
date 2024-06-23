const express = require("express");
const mongoose = require("./db");
const todo = require("./module/todo");
const app = express();
app.use(express.json());

app.get("/data", async (req, res) => {
  const todos = await todo.find();
  res.send(todos);
});
app.post("/data", async (req, res) => {
  await todo
    .create(req.body)
    .then(() => {
      res.send("post successfully");
    })
    .catch((err) => {
      console.log("there is an error !!!!!!!", err);
    });
});

app.delete("/data/:id", async (req, res) => {
  const todoId = req.params.id;
  await todo.deleteOne({ _id: todoId }).then(() => {
    res.send("delete successfully");
  });
});
app.listen(3000, (req, res) => {
  console.log("server is working .....");
});
