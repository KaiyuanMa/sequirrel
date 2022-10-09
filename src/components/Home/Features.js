import React from "react";
const img1 = require("../../../public/img/feature-section-1.png");
const img2 = require("../../../public/img/feature-section-2.png");
const img3 = require("../../../public/img/feature-section-3.png");

function Features() {
  return (
    <div className="feature-wrapper">
      <div className="feature-block" data-aos="fade-right">
        <div className="feature-text-list">
          <div className="feature-text-title">You name it we got it</div>
          <div className="feature-text-content">
            Supports all Sequelize datatypes and 33 types of validations. Add or
            delete a validations to your model with one click.
          </div>
        </div>
        <div className="feature-img">
          <img src={img1} />
        </div>
      </div>
      <div className="feature-block" data-aos="fade-left">
        <div className="feature-img feature-img-2">
          <img src={img2} />
        </div>
        <div className="feature-text-list">
          <div className="feature-text-title">Made for and by Developers</div>
          <div className="feature-text-content">
            Use datatypes that are not included in Sequirrel. As long as you
            know what you are doing.
          </div>
        </div>
      </div>
      <div className="feature-block" data-aos="fade-right">
        <div className="feature-text-list">
          <div className="feature-text-title">
            One account, unlimited access
          </div>
          <div className="feature-text-content">
            Manage all your database models with one account. Feel free to leave
            and get back on a WIP project, as Sequirrel will remember all your
            actions.
          </div>
        </div>
        <div className="feature-img feature-img-3">
          <img src={img3} />
        </div>
      </div>
    </div>
  );
}

export default Features;
