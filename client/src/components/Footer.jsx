import React from "react";
import { HashLink } from "react-router-hash-link";

function Footer() {
  return (
    <footer className="h-60 mt-36 w-full bg-[#9F8565]  lg:mr-[8rem] overflow-x-hidden">
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
      <div className="bg-[#8A7A5F] shadow-[0_-2px_5.6px_1px_rgba(0,0,0,0.25)] text-white sm:text-lg md:text-3xl flex sm:flex-row flex-col items-center justify-center  h-14">
        <p className="">جميع الحقوق محفوطة. تم تصميمه بواسطة</p>
        <span className="text-left font-bold text-[#554a38]">محمود خالد </span>
      </div>
    </footer>
  );
}

export default Footer;
