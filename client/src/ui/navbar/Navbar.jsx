import React from "react";
import Links from "./Links";

function Navbar({ isLogin, onSetIsLogin }) {
  return <Links isLogin={isLogin} onSetIsLogin={onSetIsLogin} />;
}

export default Navbar;
