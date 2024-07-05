import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function Add(props) {
  const [newTitle, setNewTitle] = useState("");

  const createNewTodo = () => {
    console.log("createNewTodo from ADD");
    props.createFunc({ title: newTitle, isCompleted: false });
  };

  return (
    <div className="add-container">
      <InputGroup size="lg">
        <Form.Control
          aria-label="Large"
          aria-describedby="inputGroup-sizing-sm"
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
      </InputGroup>
      <br />
      <Button variant="secondary" onClick={createNewTodo}>
        Create New Todo
      </Button>{" "}
    </div>
  );
}
