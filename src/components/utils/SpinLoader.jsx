import React from "react";
import "../../css/SpinLoader.css";

const SpinLoader = () => {
  return (
    <>
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
};

export default SpinLoader;
