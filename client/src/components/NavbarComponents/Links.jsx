import React from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

function Links() {
  return (
    <div className="w-64 fixed top-0 right-0 h-screen pt-[114px] pb-[27px] bg-[#43766C] px-6 flex items-center justify-between flex-col">
      <ul className="flex flex-col items-center justify-center gap-8">
        <li className="text-[#fff] text-2xl font-medium">
          <HashLink smooth to="/#home">
            الصفحة الرئيسية
          </HashLink>
        </li>
        <li className="text-[#fff] text-2xl font-medium">
          <HashLink smooth to="/#about">
            من نحن
          </HashLink>
        </li>
        <li className="text-[#fff] text-2xl font-medium">
          <HashLink smooth to="/#teacher">
            المعلمين
          </HashLink>
        </li>
        <li className="text-[#fff] text-2xl font-medium">
          <HashLink smooth to="/#contact">
            تواصل معنا
          </HashLink>
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
