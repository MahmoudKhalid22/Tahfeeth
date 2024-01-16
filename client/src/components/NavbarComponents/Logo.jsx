import React from "react";
import logo from "../../assets/logo.png";
import { HashLink } from "react-router-hash-link";

function Logo() {
  return (
    <div className="ml-1 sm:m-0 w-16 sm:w-20  ">
      <HashLink smooth to={"/#home"}>
        <img className="w-full object-cover" src={logo} alt="logo" />
      </HashLink>
    </div>
  );
}

export default Logo;
