import React from "react";
import loader from "../assets/loader.gif";
import "./loader.css";
import { createPortal } from "react-dom";

const Loader = () => {
  return createPortal(
    <div className="wrapper">
      <div className="loader">
        <img src={loader} alt="Loading..." />
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default Loader;
