import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../state/actionCreators/authAC";
import { apiAddUser } from "../api/user";

function Signup(props) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState("");

  const handelSubmit = (ev) => {
    ev.preventDefault();
    if (password !== confirm) alert("different password");
    else {
      submitUser();
    }
  };

  const submitUser = async () => {
    const response = await apiAddUser({
      username: username,
      password: password,
      email: email,
    });
    if (response.data.type == "error") {
      alert(response.data.message);
    } else {
      const credentials = { username: username, password: password };
      dispatch(login(credentials));
    }
  };

  return (
    <div className="userControl-wrapper">
      <form className="login-form" onSubmit={handelSubmit}>
        <label>Username*</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Password*</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>Confirm Password*</label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <label>Email*</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="login-form-btn signup-btn">SignUp</button>
        <p onClick={() => props.changePage("login")} className="back-to-login">
          Back to login
        </p>
      </form>
    </div>
  );
}

export default Signup;
