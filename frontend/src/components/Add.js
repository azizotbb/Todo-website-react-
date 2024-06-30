import React, { useState } from "react";

export default function Add(props) {
  const [newTitle, setNewTitle] = useState("");

  const createNewTodo = () => {
    console.log("createNewTodo from ADD");
    props.createFunc({ title: newTitle, isCompleted: false });
  };

  return (
    <div className="Add">
      <input
        type="text"
        placeholder="Write new title here ..."
        onChange={(e) => {
          setNewTitle(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            createNewTodo();
          }
        }}
      />
      <br></br>
      <button onClick={createNewTodo}>Create New Todo</button>
    </div>
  );
}
