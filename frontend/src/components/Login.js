import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setmessage] = useState("");

  const body = {
    email,
    password,
  };

  const login = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/login", body)
      .then((e) => {
        setmessage(e.data.message);
        props.setIsLogedIn(true);
        props.settUsername(e.data.userName);
      })
      .catch((err) => {
        console.log("Err", err);
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
        <p>{message}</p>
        <br />
        <Button variant="primary" type="submit" onClick={login}>
          Submit
        </Button>
        <br />
        <Link to={"/register"}> Dont have an account ?</Link>
      </Form>
    </div>
  );
}
