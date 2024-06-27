import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Todo from "./components/Todo";
import Add from "./components/Add";

function App() {
  const [task, setTask] = useState([]);
  useEffect(() => {}, []);

  axios
    .get("http://localhost:5000/data")
    .then((res) => {
      setTask(res.data);
    })
    .catch((err) => {
      console.log("error", err);
    });

  const taskMap = task.map((elm, i) => {
    return (
      <Todo
        key={i}
        title={elm.title}
        isCompleted={elm.isCompleted}
        id={elm._id}
      />
    );
  });

  return (
    <div className="App">
      <Add />
      {taskMap}
    </div>
  );
}

export default App;
