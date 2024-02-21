import React from "react";
import "./StarsStyle.css";

type starProps = {
  className: string;
};

function Stars() {
  return (
    <div className="starContainer">
      <span className="star1"></span>
      <span className="star2"></span>
      <span className="star3"></span>
      <span className="star4"></span>
    </div>
  );
}

export default Stars;
