import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

import Todo from "./components/Todo";
import Add from "./components/Add";
import Register from "./components/Register";
import Login from "./components/Login";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(`http://localhost:5000/data`)
      .then((response) => {
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

  const pageRegister = () => {
    if (page === "" || page === "login") {
      setPage("register");
    } else {
      setPage("");
    }
  };

  const pageLogin = () => {
    if (page === "" || page === "register") {
      setPage("login");
    } else {
      setPage("");
    }
  };

  return (
    <div className="App">
      <button className="register" onClick={pageRegister}>
        Register
      </button>
      <button className="login" onClick={pageLogin}>
        Login
      </button>
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
      {page === "register" && <Register />}
      {page === "login" && <Login />}

      {mapOverTasks}
    </div>
  );
}
