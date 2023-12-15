import React from "react";
import { Link } from "react-router-dom";

function Buttons() {
  return (
    <div className="btnNav hidden sm:flex gap-4 justify-end ml-4 py-4  px-6">
      <Link to={`/register?mode=login`}>
        <button className="py-2 px-4 font-bold text-xl bg-green-500 hover:bg-green-600 text-slate-100 transition-all rounded-sm">
          تسجيل الدخول
        </button>
      </Link>
      <Link to={`/register?mode=signup`}>
        <button className="py-2 px-4 font-bold text-xl bg-emerald-700 hover:bg-emerald-800  text-slate-100 transition-all rounded-sm">
          إنشاء حساب
        </button>
      </Link>
    </div>
  );
}

export default Buttons;
