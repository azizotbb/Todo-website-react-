import React, { useState } from "react";
import axios from "axios";

export default function Add() {
  const [newTask, setNewTask] = useState("");

  const change = (event) => {
    setNewTask(event.target.value);
  };

  const send = async () => {
    await axios
      .post("http://localhost:5000/data", {
        title: newTask,
        isCompleted: false,
      })
      .then(() => {
        console.log("created successfully");
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <div>
      <input
        type="text"
        onChange={change}
        placeholder="Write new title here ..."
      ></input>
      <br />
      <button onClick={send}>Create New Todo</button>
      <br />
    </div>
  );
}
