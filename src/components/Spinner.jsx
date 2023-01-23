import React from "react";
import "../styles/spinner.css";

function Spinner() {
  return (
    <div className="bg-spinner">
      <div className="spinner">
        <div className="cube1"></div>
        <div className="cube2"></div>
      </div>
    </div>
  );
}

export default Spinner;
