import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <div className="w-16 sm:w-20  ">
      <Link to={"/"}>
        <img className="w-full object-cover" src={logo} alt="logo" />
      </Link>
    </div>
  );
}

export default Logo;
