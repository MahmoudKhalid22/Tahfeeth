import React from "react";
<<<<<<< HEAD
import { HashLink } from "react-router-hash-link/dist/react-router-hash-link.cjs.production";
=======
import { HashLink } from "react-router-hash-link";
>>>>>>> bb7e4c6d2275dda7a1a7a02d7be352e55df82bf1

function Proposal({ onSetActiveLink, observer }) {
  return (
    <div
      id="home"
<<<<<<< HEAD
      className="mr-[22rem] pt-36 flex items-start min-h-screen text-center sm:text-right justify-start flex-col"
    >
      <h1 className="mb-8  text-center sm:text-right font-bold text-xl sm:text-3xl block">
        منصة <span className="text-[#811919] text-4xl">نحيا بالقرآن</span>{" "}
        لتعليم قراءة القرآن الكريم
      </h1>
      <p className="leading-[2.5rem]  text-sm sm:text-[1.5rem] sm:w-[60%] ">
=======
      className="mr-20 sm:mr-28 lg:mr-[20rem] pt-28 flex items-start min-h-screen text-right justify-start flex-col overflow-x-hidden"
    >
      <h1 className="text-right font-bold text-xl sm:text-3xl block">
        منصة
        <span className="text-[#8a7762] text-2xl sm:text-4xl">
          {" "}
          نَحْيَا بِالْقُرْآن{" "}
        </span>
        لتعليم قراءة القرآن الكريم
      </h1>
      <p className="mt-8 leading-[1.5rem] sm:leading-[2.5rem]  text-sm sm:text-[1.5rem] w-[85%] lg:w-[60%] ">
>>>>>>> bb7e4c6d2275dda7a1a7a02d7be352e55df82bf1
        مرحبًا بك في منصة تعليم قراءة القرآن الكريم. نقدم لك رحلة فريدة ومثيرة
        نحو إتقان فنون التلاوة واللفظ الصحيح. تتميز منصتنا بمجموعة من المميزات
        التي تجمع بين التكنولوجيا المبتكرة وجودة التعليم التقليدي.
      </p>
<<<<<<< HEAD
      <div>
        <HashLink smooth to={"/#about"}>
          <button className="py-2 px-4 mt-8  font-bold text-xl bg-[#9F8565] hover:bg-[#886d4d]   text-slate-100 transition-all rounded-sm">
=======
      <div className="flex sm:flex-row flex-col justify-start items-start mt-8 gap-8 sm:gap-0">
        <HashLink smooth to={"/#about"}>
          <button className="py-1 sm:py-2 px-2 sm:px-4  font-bold text-sm sm:text-xl bg-[#9F8565] hover:bg-[#886d4d]   text-slate-100 transition-all rounded-sm ">
>>>>>>> bb7e4c6d2275dda7a1a7a02d7be352e55df82bf1
            نبذة عنا
          </button>
        </HashLink>
        <HashLink smooth to={"/#teachers"}>
<<<<<<< HEAD
          <button className="py-2 px-4 mt-8 mr-8 font-bold text-xl  hover:text-[#644746]   text-[#5E4E3B] transition-all rounded-sm">
=======
          <button className="py-1 sm:py-2 sm:px-4  sm:mr-8 font-bold text-sm sm:text-xl  hover:text-[#644746]   text-[#5E4E3B] transition-all rounded-sm">
>>>>>>> bb7e4c6d2275dda7a1a7a02d7be352e55df82bf1
            الذهاب إلى المعلمين
          </button>
        </HashLink>
      </div>
    </div>
  );
}

export default Proposal;
