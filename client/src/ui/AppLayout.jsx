import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";

function AppLayout({ isLogin, onSetIsLogin }) {
  return (
    <div className="flex">
      <nav className="flex-grow-1">
        <Navbar isLogin={isLogin} onSetIsLogin={onSetIsLogin} />
      </nav>
      <main className="flex-grow-4 w-full overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
