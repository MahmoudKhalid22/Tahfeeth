import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function Root({ isLogin, onSetIsLogin }) {
  return (
    <div className="flex">
      <nav className="flex-grow-1">
        <Navbar isLogin={isLogin} onSetIsLogin={onSetIsLogin} />
      </nav>
      <main className="flex-grow-4 w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default Root;
