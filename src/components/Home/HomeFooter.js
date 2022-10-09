import React from "react";

function HomeFooter() {
  return (
    <div className="home-footer">
      <div className="contact-list">
        <a href="https://github.com/KaiyuanMa/sequirrel" target="_blank">
          <span
            onclick="window.location.href='https://w3docs.com';"
            className="fa fa-github"
          />
        </a>
        <a href="https://www.linkedin.com/in/kaiyuanma/">
          <span className="fa fa-linkedin" />
        </a>
      </div>
      <div className="rights">© 2022 Sequirrel</div>
    </div>
  );
}

export default HomeFooter;
