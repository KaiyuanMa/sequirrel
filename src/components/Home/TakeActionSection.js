import React from "react";

function TakeActionSection() {
  const signUpOnClick = () => {
    const sideBarContent = document.querySelector(".side-bar-content");
    if (!sideBarContent?.classList?.contains("side-bar-content-active")) {
      const sideBarButton = document.querySelector(".side-bar-btn");
      const sideBarIcon = document.querySelector(".side-bar-icon");
      sideBarButton?.classList?.toggle("side-bar-btn-active");
      sideBarIcon?.classList?.toggle("side-bar-icon-active");
      sideBarContent?.classList?.toggle("side-bar-content-active");
    }
  };
  return (
    <div className="take-action-section-wrapper">
      <div className="take-action-section-title">
        Add Sequirrel to your tool box today !
      </div>
      <button className="take-action-signUp-btn" onClick={signUpOnClick}>
        Sign Up
      </button>
    </div>
  );
}

export default TakeActionSection;
