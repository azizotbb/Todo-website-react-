const express = require("express");
const mongoose = require("./db");
const cors = require("cors");
const todo = require("./module/todo");
const user = require("./module/user");
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
  await todo.deleteMany({ isCompleted: true }).then(() => {
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

//-------------------- user request ---------------------------
app.post("/register", async (req, res) => {
  await user
    .create(req.body)
    .then(() => {
      res.json({ message: "Create New User Successfully" });
    })
    .catch((err) => {
      console.log("error :", err);
      res.json({ message: "This email already taken" });
    });
});
app.post("/login", async (req, res) => {
  await user
    .find({ email: req.body.email })
    .then((data) => {
      if (data.length === 1) {
        if (req.body.password === data[0].password) {
          res.status(200).json({
            message: "Login successfully ",
            userName: data[0].userName,
          });
        } else {
          res.status(400).json({ message: "Wrong password" });
        }
      } else {
        res.status(404).json({ message: "Email not found" });
      }
    })
    .catch((err) => {
      console.log("error ", err);
    });
});

app.listen(5000, (req, res) => {
  console.log("server is working .....");
});
