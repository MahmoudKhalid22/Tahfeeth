import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";

function AppLayout({ isLogin, onSetIsLogin }) {
  return (
    <div className="applayout">
      <nav>
        <Navbar isLogin={isLogin} onSetIsLogin={onSetIsLogin} />
      </nav>
      <main className="overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
