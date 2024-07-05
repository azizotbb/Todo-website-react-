import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setmessage] = useState("");

  const body = { email, password, username };

  const register = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/register", body)
      .then((response) => {
        console.log(response.data);
        console.log(body);
        setmessage(response.data.message);
        setUsername(response.data.userName);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  return (
    <div>
      <Form className="form-container">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Label>Username</Form.Label>

        <Form.Control
          type="text"
          placeholder="UserName"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        <p>{message}</p>
        <Button variant="primary" type="submit" onClick={register}>
          Submit
        </Button>
        <br />
        <Link to={"/login"}> have an account ?</Link>
      </Form>
    </div>
  );
}
