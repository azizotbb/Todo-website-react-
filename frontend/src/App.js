import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Todo from "./components/Todo";
function App() {
  const [task, setTask] = useState([]);
  useEffect(() => {}, []);

  const taskMap = task.map((elm, i) => {
    return <Todo title={elm.title} isCompleted={elm.isCompleted} />;
  });

  axios
    .get("http://localhost:5000/data")
    .then((res) => {
      setTask(res.data);
    })
    .catch((err) => {
      console.log("err", err);
    });

  return <div className="App">{taskMap}</div>;
}

export default App;
