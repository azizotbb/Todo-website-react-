const express = require("express");
const mongoose = require("./db");
const app = express();
app.get("/hey", (req, res) => {
  res.send("heyy vister");
});
app.listen(3000, (req, res) => {
  console.log("server is working .....");
});
