import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../state/actionCreators/authAC";
import Login from "./Login";
import Signup from "./Signup";
import logo from "../../public/logo.svg";

function UserControl() {
  const dispatch = useDispatch();
  const [currPage, setCurrPage] = useState("login");

  return (
    <div className="user-control-wrapper">
      <div className="side-bar-content-logo">
        <img className="logo" src={logo} />
        <p>Sequirrel</p>
      </div>
      {currPage == "login" ? (
        <Login changePage={setCurrPage} />
      ) : (
        <Signup changePage={setCurrPage} />
      )}
      ;
    </div>
  );
}

export default UserControl;
