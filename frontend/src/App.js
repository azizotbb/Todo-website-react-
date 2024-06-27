import React, { useState, useEffect } from "react";
import "./App.css";

import axios from "axios";
import Todo from "./components/Todo";
import Add from "./components/Add";

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(`http://localhost:5000/data`)
      .then((response) => {
        console.log("DATA: ", response.data);
        setTasks(response.data);
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };

  const postNewTodo = (body) => {
    axios
      .post(`http://localhost:5000/data`, body)
      .then((response) => {
        console.log("DATA: ", response.data);
        getData();
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:5000/data/${id}`)
      .then((response) => {
        console.log("DATA: ", response.data);
        getData();
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };

  const mapOverTasks = tasks.map((taskObj, i) => (
    <Todo key={i} task={taskObj} deleteTodo={deleteTodo} />
  ));
  return (
    <div className="App">
      <Add createFunc={postNewTodo} />
      {mapOverTasks}
    </div>
  );
}
