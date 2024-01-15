import React, { useEffect } from "react";
import { HashLink } from "react-router-hash-link";

function Proposal() {
  return (
    <div
      id="home"
      className="mr-[22rem] pt-28 flex items-start min-h-screen text-center sm:text-right justify-start flex-col"
    >
      <h1 className="text-center sm:text-right font-bold text-xl sm:text-3xl block">
        منصة{" "}
        <span className="text-[#8a7762] text-4xl"> نَحْيَا بِالْقُرْآن </span>
        لتعليم قراءة القرآن الكريم
      </h1>
      <p className="mt-8 leading-[2.5rem]  text-sm sm:text-[1.5rem] sm:w-[60%] ">
        مرحبًا بك في منصة تعليم قراءة القرآن الكريم. نقدم لك رحلة فريدة ومثيرة
        نحو إتقان فنون التلاوة واللفظ الصحيح. تتميز منصتنا بمجموعة من المميزات
        التي تجمع بين التكنولوجيا المبتكرة وجودة التعليم التقليدي.
      </p>
      <div>
        <HashLink smooth to={"/#about"}>
          <button className="py-2 px-4 mt-8  font-bold text-xl bg-[#9F8565] hover:bg-[#886d4d]   text-slate-100 transition-all rounded-sm">
            نبذة عنا
          </button>
        </HashLink>
        <HashLink smooth to={"/#teachers"}>
          <button className="py-2 px-4 mt-8 mr-8 font-bold text-xl  hover:text-[#644746]   text-[#5E4E3B] transition-all rounded-sm">
            الذهاب إلى المعلمين
          </button>
        </HashLink>
      </div>
    </div>
  );
}

export default Proposal;
