import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function Root({ isLogin }) {
  return (
    <div className="w-full">
      <Navbar isLogin={isLogin} />
      <Outlet />
    </div>
  );
}

export default Root;
