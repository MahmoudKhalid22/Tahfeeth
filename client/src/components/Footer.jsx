import React from "react";
import { HashLink } from "react-router-hash-link";

function Footer() {
  return (
    <footer className="h-60 mt-36 w-full bg-[#9F8565]  lg:mr-[8rem] overflow-x-hidden ">
      <ul className="h-[11.5rem]  md:flex md:flex-row grid grid-cols-2 mr-[26%] sm:mr-28 md:mr-0 items-center justify-center gap-12">
        <li className="text-md sm:text-2xl text-white">
          <HashLink smooth to="/#home">
            الصفحة الرئيسية
          </HashLink>
        </li>
        <li className="text-md sm:text-2xl text-white">
          <HashLink smooth to={"/#about"}>
            من نحن
          </HashLink>
        </li>
        <li className="text-md sm:text-2xl text-white">
          <HashLink smooth to={"/#teachers"}>
            المعلمين
          </HashLink>
        </li>
        <li className="text-md sm:text-2xl text-white">
          <HashLink smooth to={"/#contact"}>
            تواصل معنا
          </HashLink>
        </li>
      </ul>
      <div className="bg-[#8A7A5F] shadow-[0_-2px_5.6px_1px_rgba(0,0,0,0.25)] text-[#ececec] flex flex-wrap text-center items-center justify-center absolute bottom-0 w-[90%] sm:w-[95%] md:w-full md:mr-8 lg:w-[80%] 2xl:w-[95%] left-0 gap-1 px-8 sm:px-1 py-2">
        <p className="text-[0.5rem] sm:text-sm md:text-lg">
          جميع الحقوق محفوطة. تم تصميمه بواسطة
        </p>
        <span className="text-left font-semibold text-[#554a38] text-[0.5rem] sm:text-sm md:text-xl">
          محمود خالد{" "}
        </span>
      </div>
    </footer>
  );
}

export default Footer;
