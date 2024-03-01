import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function Root() {
  return (
    <div className="w-full">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Root;
