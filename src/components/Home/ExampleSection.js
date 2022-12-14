import React from "react";
const mapPng = require("../../../public/img/example-section-map.png");
const result1 = require("../../../public/img/example-section-result1.png");
const result2 = require("../../../public/img/example-section-result2.png");

function ExampleSection() {
  return (
    <div className="example-wrapper" data-aos="fade-up">
      <div className="example-wrapper-title">
        Creating a database has never been easier.
      </div>
      <div className="example-wrapper-subtitle">
        Save your time for something greater, leave dirty work to Sequirrel.
      </div>
      <div className="example-wrapper-imgs">
        <div className="example-map-img">
          <img src={mapPng}></img>
        </div>
        <div className="example-arrow">
          <span className="fa fa-arrow-circle-o-right" />
        </div>
        <div className="example-result-imgs">
          <img src={result1} />
          <img src={result2} />
        </div>
      </div>
    </div>
  );
}

export default ExampleSection;
