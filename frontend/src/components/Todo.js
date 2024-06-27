import React from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

export default function Todo(props) {
  const del = () => {
    axios
      .delete(`http://localhost:5000/data/${props.id}`)
      .then((response) => {
        console.log(`Deleted post with ID ${props.id}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="todoDiv">
      <h2
        style={{ textDecoration: props.isCompleted ? "line-through" : "none" }}
      >
        {props.title}
      </h2>
      <input
        type="checkbox"
        className="checkbox"
        checked={props.isCompleted}
      ></input>

      <button className="del" onClick={del}>
        <FaTrash />
      </button>
    </div>
  );
}
