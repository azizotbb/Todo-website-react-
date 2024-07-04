import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
      <form>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Write your email here"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <label htmlFor="password">Password</label>

        <input
          type="password"
          placeholder="Write your password here"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <label htmlFor="username">Username</label>

        <input
          type="text"
          placeholder="Write your username here"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <br />
        <Link to={"/login"}>Have an account</Link>

        <p>{message}</p>
        <input type="submit" value={"register"} onClick={register} />
      </form>
    </div>
  );
}
