import React from 'react'
import CompanyCover from "../images/cover.jpg";
import CompnayLogo from "../images/company-logo.png";

export default ({cover, logo}) => {
    return (
      <section
        className="company-cover"
        style={{
          backgroundImage: `url(${
             CompanyCover
          })`,
        }}
      >
        <div className="company-logo-wrap">
          <img
            src={CompnayLogo}
            alt="company logo"
          />
        </div>
      </section>
    );
}