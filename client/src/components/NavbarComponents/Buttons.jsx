import React from "react";
import { Link } from "react-router-dom";

function Buttons() {
  return (
    <div className="btnNav hidden sm:flex gap-4 justify-end ml-4 py-4  px-6">
      <Link to={`/register?mode=login`}>
        <button className="py-2 px-4 font-bold text-xl bg-[#b29a9a] hover:bg-[#916f6e]  text-slate-100 transition-all rounded-sm">
          تسجيل الدخول
        </button>
      </Link>
      <Link to={`/register?mode=signup`}>
        <button className="py-2 px-4 font-bold text-xl bg-[#916f6e] hover:bg-[#745958]   text-slate-100 transition-all rounded-sm">
          إنشاء حساب
        </button>
      </Link>
    </div>
  );
}

export default Buttons;
