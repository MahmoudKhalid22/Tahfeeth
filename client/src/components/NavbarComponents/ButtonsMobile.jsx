import React from "react";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

function ButtonsMobile({ activeState, onSetActive }) {
  return (
    <>
      <div
        className={`top-0 w-screen h-[100vh] fixed transition-all bg-white ${
          activeState
            ? "translate-x-0 opacity-80 "
            : "translate-x-full opacity-0 "
        }`}
      >
        <div onClick={() => onSetActive(false)}>
          <IoClose className="fill-emerald-800 w-12 h-12 absolute top-8 left-4 cursor-pointer" />
          <div className="flex items-center justify-center h-screen flex-col gap-10">
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
        </div>
      </div>
    </>
  );
}

export default ButtonsMobile;
