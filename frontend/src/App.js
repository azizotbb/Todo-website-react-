import React, { useState, useEffect } from "react";
import "./App.css";

import axios from "axios";
import Todo from "./components/Todo";
import Add from "./components/Add";
import Register from "./components/Register";

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

  const toggleTodo = (id, newStatus) => {
    axios
      .put(`http://localhost:5000/data/${id}/${newStatus}`)
      .then((response) => {
        console.log("DATA: ", response.data);
        getData();
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };

  const deleteTasks = () => {
    axios
      .delete(`http://localhost:5000/deleteMany`)
      .then((response) => {
        console.log("DATA: ", response.data);
        getData();
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };

  const filterData = (status) => {
    axios
      .get(`http://localhost:5000/filter?isCompleted=${status}`)
      .then((response) => {
        console.log("DATA: ", response.data);
        setTasks(response.data);
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };
  const mapOverTasks = tasks.map((taskObj, i) => (
    <Todo
      key={taskObj._id}
      task={taskObj}
      deleteTodo={deleteTodo}
      toggleTodo={toggleTodo}
    />
  ));
  return (
    <div className="App">
      <Add createFunc={postNewTodo} />
      <button onClick={getData}>GET TASKS</button>
      <button onClick={deleteTasks}>DELETE Completed tasks </button>
      <button
        onClick={() => {
          filterData(true);
        }}
      >
        GET DONE
      </button>
      <button
        onClick={() => {
          filterData(false);
        }}
      >
        GET PENDING
      </button>
      <Register></Register>
      {mapOverTasks}
    </div>
  );
}
