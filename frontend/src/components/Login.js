import axios from "axios";
import React, { useState } from "react";

export default function Login() {
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
      })
      .catch((err) => {
        console.log("Err", err);
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
        <br />
        <p>{message}</p>
        <input type="submit" value={"Login"} onClick={login} />
      </form>
    </div>
  );
}
