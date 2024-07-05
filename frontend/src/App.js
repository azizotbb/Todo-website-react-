import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

import Todo from "./components/Todo";
import Add from "./components/Add";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [isLogedIn, setIsLogedIn] = useState();
  const [username, settUsername] = useState("");

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

  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link className="link" to={"/home"}>
              Home
            </Link>
          </li>
          <li>
            {isLogedIn ? (
              <p className="logedIn">
                {" "}
                <Button
                  style={{ marginRight: "20px" }}
                  variant="danger"
                  onClick={() => {
                    setIsLogedIn(false);
                  }}
                >
                  Logout
                </Button>
                Welcome {username}
              </p>
            ) : (
              <Link className="login" to={"/login"}>
                Login
              </Link>
            )}
          </li>
          <li>
            {isLogedIn ? (
              <></>
            ) : (
              <Link className="register" to={"/register"}>
                Register
              </Link>
            )}
          </li>
          <li>
            <Link className="link" to={"/todo"}>
              Todo
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" />
        <Route
          path="/todo"
          element={
            <div className="home">
              <Add createFunc={postNewTodo} />

              <div className="btns-todo">
                <Button variant="success" onClick={getData}>
                  GET TASKS
                </Button>
                <Button variant="danger" onClick={deleteTasks}>
                  DELETE COMPLETED TASKS
                </Button>
                <Button
                  variant="info"
                  onClick={() => {
                    filterData(true);
                  }}
                >
                  GET DONE
                </Button>
                <Button
                  variant="info"
                  onClick={() => {
                    filterData(false);
                  }}
                >
                  GET PENDING
                </Button>
              </div>

              {mapOverTasks}
            </div>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <Login setIsLogedIn={setIsLogedIn} settUsername={settUsername} />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home></Home>} />
      </Routes>
    </div>
  );
}
