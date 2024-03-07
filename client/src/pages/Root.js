import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function Root({ isLogin, onSetIsLogin }) {
  return (
    <div className="w-full">
      <Navbar isLogin={isLogin} onSetIsLogin={onSetIsLogin} />
      <Outlet />
    </div>
  );
}

export default Root;
