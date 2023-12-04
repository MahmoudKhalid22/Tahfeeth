import React from "react";
import logo from "../assets/logo.png";
import { AiOutlineMenu } from "react-icons/ai";

function Navbar() {
  return (
    <nav className="flex items-center py-4 px-6 justify-between h-28">
      <div className="w-16 sm:w-20">
        <img className="w-full object-cover" src={logo} alt="logo" />
      </div>
      <div className="btnNav hidden sm:flex gap-4 justify-end ml-4">
        <button className="py-2 px-4 font-bold text-xl bg-green-500 hover:bg-green-600 text-slate-100 transition-all">
          تسجيل الدخول
        </button>
        <button className="py-2 px-4 font-bold text-xl bg-emerald-700 hover:bg-emerald-800  text-slate-100 transition-all">
          إنشاء حساب
        </button>
      </div>
      <div className="block sm:hidden ml-4">
        <AiOutlineMenu className="fill-emerald-800 w-9 h-9" />
      </div>
    </nav>
  );
}

export default Navbar;
