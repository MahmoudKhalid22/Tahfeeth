import React, { useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";
import { AiFillHome } from "react-icons/ai";
import { IoMdInformationCircle } from "react-icons/io";

import { FaChalkboardTeacher } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { RiLoginBoxLine } from "react-icons/ri";
import { LiaUserPlusSolid } from "react-icons/lia";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import { GiEntryDoor } from "react-icons/gi";
import { RxGear } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";

const data = localStorage.getItem("data")
  ? JSON.parse(localStorage.getItem("data"))
  : null;

function Links({ isLogin, onSetIsLogin }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState(isLogin);
  // SEARCH FOR TEACHER
  const [teacherName, setTeacherName] = useState("");
  const [searchErr, setSearchErr] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  // console.log(status);

  useEffect(() => {
    const isLoggedInStatus = JSON.parse(localStorage.getItem("status"));
    setStatus(isLoggedInStatus);
  }, [isLogin]);

  const logout = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://tahfeeth-production.up.railway.app/user/logout",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + data.accessToken,
          },
        }
      );
      setLoading(false);
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error(errorData.error);
      }
      onSetIsLogin(false);
      localStorage.setItem("data", JSON.stringify([]));
      return navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // const searchForTeacher = async (name) => {
  //   name = name.toString();
  //   try {
  //     setLoadingSearch(true);
  //     setSearchErr(false);
  //     const res = await fetch(
  //       "http://localhost:5000/user/search?name=" + name.toString()
  //     );
  //     const result = await res.json();
  //     console.log(result);
  //     navigate("/searched-teacher");
  //   } catch (err) {
  //     setSearchErr(true);
  //   } finally {
  //     setLoadingSearch(false);
  //   }
  // };

  return (
    <div className="overflow-y-auto fixed bottom-0 md:flex-1 md:w-[20%] md:top-0 right-0 z-40 md:h-screen md:pt-[2rem] md:pb-[27px] bg-[#43766C] px-6 flex items-center gap-8 md:flex-col h-[10rem] w-full">
      <Logo />
      <div className="flex w-full md:w-auto h-full flex-wrap items-center justify-between md:flex-col py-4 gap-6">
        <ul className="flex md:flex-col w-full md:w-auto items-center justify-around gap-4">
          <li className={`text-[#fff] text-2xl font-medium pb-2`}>
            <HashLink smooth to="/#home">
              <div className="block lg:hidden">
                <AiFillHome className="w-8 h-8 text-bold" />
              </div>
              <p className="hidden lg:block">الصفحة الرئيسية</p>
            </HashLink>
          </li>
          <li className={`text-[#fff] text-2xl font-medium pb-2`}>
            <HashLink smooth to="/#about">
              <div className="block lg:hidden">
                <IoMdInformationCircle className="w-8 h-8 text-bold" />
              </div>
              <p className="hidden lg:block">من نحن</p>
            </HashLink>
          </li>
          <li className={`text-[#fff] text-2xl font-medium pb-2`}>
            <HashLink smooth to="/#teachers">
              <div className="block lg:hidden">
                <FaChalkboardTeacher className="w-8 h-8 text-bold" />
              </div>
              <p className="hidden lg:block">المعلمين</p>
            </HashLink>
          </li>
          <li className={`text-[#fff] text-2xl font-medium pb-2`}>
            <HashLink smooth to="/#contact">
              <div className="block lg:hidden">
                <FaRegMessage className="w-8 h-8 text-bold" />
              </div>
              <p className="hidden lg:block">تواصل معنا</p>
            </HashLink>
          </li>
        </ul>

        {!isLogin ? (
          <div className="flex md:flex-col items-center justify-center gap-8 w-full">
            {/* <form
              className="flex items-center justify-between bg-slate-100"
              onSubmit={async (e) => {
                e.preventDefault();
                await searchForTeacher(teacherName);
              }}
            >
              <input
                type="text"
                placeholder="البحث عن معلم"
                className="py-2 px-4 text-md outline-none "
                onChange={(e) => setTeacherName(e.target.value)}
              />
              <button
                type="submit"
                disabled={loadingSearch}
                className="border-none py-0 outline-none text-xl px-2 cursor-pointer bg-slate-200 hover:bg-slate-300 transition-colors h-full"
              >
                {loadingSearch ? (
                  <div>
                    <Spinner width="80" height="80" />
                  </div>
                ) : (
                  <IoIosSearch />
                )}
              </button>
            </form> */}
            <Link to={"/register?mode=login"}>
              <div className="block lg:hidden">
                <RiLoginBoxLine className="w-8 h-8 text-bold pb-2 border-white text-[#C1A98D] hover:text-[#9F8565] transition-colors" />
              </div>
              <button className="text-white text-2xl hidden lg:block">
                تسجيل الدخول
              </button>
            </Link>
            <HashLink to={"/register?mode=signup"}>
              <div className="block lg:hidden">
                <LiaUserPlusSolid className="w-8 h-8 text-bold pb-2 border-white text-[#9F8565] hover:text-[#8a7762] transition-colors " />
              </div>
              <button className="bg-[#9F8565] hover:bg-[#8a7762] transition-colors px-5 py-3 w-48 text-white text-2xl hidden lg:block">
                إنشاء حساب
              </button>
            </HashLink>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full md:flex-col gap-4">
            {/* <form
              className="flex items-center justify-between bg-slate-100 mx-4 w-[80%]"
              onSubmit={async (e) => {
                e.preventDefault();
                await searchForTeacher(teacherName);
              }}
            >
              <input
                type="text"
                placeholder="البحث عن معلم"
                className="py-2 px-4 text-md outline-none border border-green-900"
                onChange={(e) => setTeacherName(e.target.value)}
              />
              <button
                type="submit"
                className="border-none py-0 outline-none text-xl px-2 cursor-pointer bg-slate-200 hover:bg-slate-300 transition-colors h-full"
              >
                <IoIosSearch />
              </button>
            </form> */}
            <Link
              to="/details"
              className=" text-center text-4xl lg:text-lg p-2 border-none outline-none cursor-pointer rounded-lg transition-colors flex items-center justify-center text-white hover:text-green-300"
            >
              <span className="hidden lg:block">حسابي</span>
              <div className="block lg:hidden">
                <CgProfile />
              </div>
            </Link>
            <Link
              to="/settings"
              className="text-center text-4xl lg:text-lg p-2 border-none outline-none cursor-pointer rounded-lg transition-colors flex items-center justify-center text-white hover:text-green-300"
            >
              <span className="hidden lg:block">لوحة التحكم</span>
              <div className="block lg:hidden">
                <RxGear />
              </div>
            </Link>
            {loading ? (
              <p className="text-center text-[#ececec] text-2xl">تحميل ...</p>
            ) : error ? (
              <div className="text-center text-[#ececec] text-xl">
                <span>خطأ داخلي</span>
                <p
                  className="text-[0.5rem] sm:text-[0.75rem] cursor-pointer"
                  onClick={logout}
                >
                  سجل خروج مرة أخرى
                </p>
              </div>
            ) : (
              <button
                className="text-center text-4xl lg:text-lg p-2 border-none outline-none cursor-pointer rounded-lg transition-colors flex items-center justify-center text-white hover:text-green-300"
                onClick={logout}
                title="تسجيل الخروج"
              >
                <span className="hidden lg:block">تسجيل الخروج</span>
                <div className="block lg:hidden">
                  <GiEntryDoor />
                </div>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Links;
