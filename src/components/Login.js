import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../state/actionCreators/authAC";

function Login(props) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handelSubmit = (ev) => {
    ev.preventDefault();
    const credentials = { username: username, password: password };
    dispatch(login(credentials));
  };
  return (
    <div className="userControl-wrapper">
      <form className="login-form" onSubmit={handelSubmit}>
        <label>Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p
          onClick={() => props.changePage("signup")}
          className="login-form-sign-up"
        >
          Don't have an account?
        </p>
        <button className="login-form-btn">Login</button>
      </form>
    </div>
  );
}

export default Login;
