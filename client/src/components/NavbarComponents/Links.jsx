import React from "react";
import { Link } from "react-router-dom";

function Links() {
  return (
    <div className="w-[262px] fixed top-0 right-0 h-screen pt-[114px] pb-[27px] bg-[#43766C] px-6 flex items-center justify-between flex-col">
      <ul className="flex flex-col items-center justify-center gap-8">
        <li className="text-[#fff] text-2xl font-medium">
          <Link to="/">الصفحة الرئيسية</Link>
        </li>
        <li className="text-[#fff] text-2xl font-medium">
          <a href="#about">من نحن</a>
        </li>
        <li className="text-[#fff] text-2xl font-medium">
          <a href="#teachers">المعلمين</a>
        </li>
        <li className="text-[#fff] text-2xl font-medium">
          <a href="#contact">تواصل معنا</a>
        </li>
      </ul>
      <div className="flex flex-col items-center justify-center gap-8">
        <Link to={"/register?mode=login"}>
          <button className="bg-[#C1A98D] hover:bg-[#9F8565] transition-colors px-5 py-3 w-48 text-white text-2xl">
            تسجيل الدخول
          </button>
        </Link>
        <Link to={"/register?mode=signup"}>
          <button className="bg-[#9F8565] hover:bg-[#8a7762] transition-colors px-5 py-3 w-48 text-white text-2xl">
            إنشاء حساب
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Links;
