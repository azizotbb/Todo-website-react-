import React from "react";

export default function Todo(props) {
  return (
    <div className="todoDiv">
      <h2>Title :</h2>
      <h2>{props.title}</h2>
      <hr />
      <h3> {props.isCompleted ? "Completed" : "not Completed"}</h3>
    </div>
  );
}
