const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/myapp")
  .then(() => {
    console.log("database is connected");
  })
  .catch((err) => {
    console.log("there is an erorr ", err);
  });
