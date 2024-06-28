const express = require("express");
const mongoose = require("./db");
const cors = require("cors");
const todo = require("./module/todo");
const app = express();
app.use(express.json());
app.use(cors());

// -----------to filter complete and incomplete data-------------

app.get("/filter", async (req, res) => {
  const todos = await todo
    .find({
      isCompleted: req.query.isCompleted,
    })
    .exec();
  res.send(todos);
});
//-------------delete all incompleted data-------------------------

app.delete("/deleteMany", async (req, res) => {
  await todo.deleteMany({}).then(() => {
    res.send("delete successfully");
  });
});

//-------------CRUD = create read update delete-------------------------

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

app.put("/data/:id/:isCompleted", async (req, res) => {
  const todoId = req.params.id;
  const isCompleted = req.params.isCompleted;
  const filter = { _id: todoId };
  const update = { isCompleted: isCompleted };
  await todo.findOneAndUpdate(filter, update).then(() => {
    res.send("update successfully");
  });
});
app.listen(5000, (req, res) => {
  console.log("server is working .....");
});
