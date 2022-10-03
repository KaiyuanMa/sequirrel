import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../state/actionCreators/authAC";
import Login from "./Login";
import Signup from "./Signup";

function UserControl() {
  const dispatch = useDispatch();
  const [currPage, setCurrPage] = useState("login");

  return currPage == "login" ? (
    <Login changePage={setCurrPage} />
  ) : (
    <Signup changePage={setCurrPage} />
  );
}

export default UserControl;
