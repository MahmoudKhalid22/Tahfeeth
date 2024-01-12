import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Buttons() {
  const [loggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem("data"))
  );

  useEffect(() => {
    setLoggedIn((pre) =>
      pre ? JSON.parse(localStorage.getItem("data")) : null
    );
  }, []);

  return (
    <div className="btnNav hidden sm:flex gap-4 justify-end ml-4 py-4  px-6 items-center">
      <Link to="/" className="text-xl text-[#916f6e] hover:text-[#745958]">
        الصفحة الرئيسية
      </Link>
      <Link
        to="/teacher"
        className="text-xl text-[#916f6e] hover:text-[#745958]"
      >
        صفحة المعلمين
      </Link>
      {!loggedIn ? (
        <>
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
        </>
      ) : (
        <>
          <Link to={`/details`}>
            <button className="py-2 px-4 font-bold text-xl bg-[#916f6e] hover:bg-[#745958]   text-slate-100 transition-all rounded-sm">
              صفحتي
            </button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Buttons;
