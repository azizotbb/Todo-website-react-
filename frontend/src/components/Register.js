import React, { useState } from "react";
import axios from "axios";

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
        setmessage(response.data.message);
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
          placeholder="email..."
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <label htmlFor="password">Password</label>

        <input
          type="password"
          placeholder="password..."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <label htmlFor="username">Username</label>

        <input
          type="text"
          placeholder="username..."
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <br />
        <p>{message}</p>
        <input type="submit" value={"register"} onClick={register} />
      </form>
    </div>
  );
}
