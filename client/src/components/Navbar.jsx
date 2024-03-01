import React from "react";
import Links from "./NavbarComponents/Links";

function Navbar({ isLogin }) {
  return <Links isLogin={isLogin} />;
}

export default Navbar;
