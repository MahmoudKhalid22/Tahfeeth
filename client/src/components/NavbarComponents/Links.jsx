import React from "react";
// import { useInView } from "react-intersection-observer";
import { HashLink } from "react-router-hash-link";
import { AiFillHome } from "react-icons/ai";
import { IoMdInformationCircle } from "react-icons/io";

import { FaChalkboardTeacher } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { RiLoginBoxLine } from "react-icons/ri";
import { LiaUserPlusSolid } from "react-icons/lia";
import Logo from "./Logo";
import { Link } from "react-router-dom";

function Links() {
  // const [active, setActive] = useState(1);

  return (
    <div className="flex-1 w-16 lg:w-64 fixed top-0 right-0 z-40 h-screen pt-[2rem] pb-[27px] bg-[#43766C] px-6 flex items-center gap-8 flex-col overflow-hidden">
      <Logo />
      <div className="flex items-center justify-between flex-col h-full  overflow-hidden">
        <ul className="flex flex-col items-center justify-center gap-8">
          <li className={`text-[#fff] text-2xl font-medium pb-2`}>
            <HashLink smooth to="/#home">
              <div className="block lg:hidden">
                <AiFillHome className="w-8 h-16 text-bold" />
              </div>
              <p className="hidden lg:block">الصفحة الرئيسية</p>
            </HashLink>
          </li>
          <li className={`text-[#fff] text-2xl font-medium pb-2`}>
            <HashLink smooth to="/#about">
              <div className="block lg:hidden">
                <IoMdInformationCircle className="w-8 h-16 text-bold" />
              </div>
              <p className="hidden lg:block">من نحن</p>
            </HashLink>
          </li>
          <li className={`text-[#fff] text-2xl font-medium pb-2`}>
            <HashLink smooth to="/#teachers">
              <div className="block lg:hidden">
                <FaChalkboardTeacher className="w-8 h-16 text-bold" />
              </div>
              <p className="hidden lg:block">المعلمين</p>
            </HashLink>
          </li>
          <li className={`text-[#fff] text-2xl font-medium pb-2`}>
            <HashLink smooth to="/#contact">
              <div className="block lg:hidden">
                <FaRegMessage className="w-8 h-16 text-bold" />
              </div>
              <p className="hidden lg:block">تواصل معنا</p>
            </HashLink>
          </li>
        </ul>
        <div className="flex flex-col items-center justify-center gap-8">
          <Link to={"/register?mode=login"}>
            <div className="block lg:hidden">
              <RiLoginBoxLine className="w-8 h-16 text-bold text-[#C1A98D] hover:text-[#9F8565] transition-colors" />
            </div>
            <button className="text-white text-2xl hidden lg:block">
              تسجيل الدخول
            </button>
          </Link>
          <HashLink to={"/register?mode=signup"}>
            <div className="block lg:hidden">
              <LiaUserPlusSolid className="w-8 h-16 text-bold pb-2 border-white text-[#9F8565] hover:text-[#8a7762] transition-colors " />
            </div>
            <button className="bg-[#9F8565] hover:bg-[#8a7762] transition-colors px-5 py-3 w-48 text-white text-2xl hidden lg:block">
              إنشاء حساب
            </button>
          </HashLink>
        </div>
      </div>
    </div>
  );
}

export default Links;
