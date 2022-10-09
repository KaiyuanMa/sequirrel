import React, { Component } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { exchangeToken, logout } from "../state/actionCreators/authAC";
import UserControl from "./UserControl";
import UserPage from "./UserPage";

function SideBar() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);

  const showSideBar = () => {
    const sideBarContent = document.querySelector(".side-bar-content");
    const sideBarButton = document.querySelector(".side-bar-btn");
    const sideBarIcon = document.querySelector(".side-bar-icon");
    sideBarButton?.classList?.toggle("side-bar-btn-active");
    sideBarIcon?.classList?.toggle("side-bar-icon-active");
    sideBarContent?.classList?.toggle("side-bar-content-active");
  };

  return (
    <div className="side-bar-wrapper">
      <button
        onClick={showSideBar}
        className={`side-bar-btn${auth.id ? " side-bar-btn-active" : ""}`}
      >
        <span
          className={`fa fa-hand-o-left side-bar-icon${
            auth.id ? " side-bar-icon-active" : ""
          }`}
        ></span>
      </button>
      <div
        className={`side-bar-content${
          auth.id ? " side-bar-content-active" : ""
        }`}
      >
        {auth.id ? <UserPage /> : <UserControl />}
      </div>
    </div>
  );
}

export default SideBar;
