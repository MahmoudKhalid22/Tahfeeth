import React from "react";
import { HashLink } from "react-router-hash-link";

function Proposal({ onSetActiveLink, observer }) {
  return (
    <div
      id="home"
      className=" relative pt-28 flex items-start min-h-screen text-right justify-start flex-col overflow-x-hidden"
    >
      <div className=" home absolute top-0 left-0 w-full h-screen">
        <img
          alt="background"
          loading="lazy"
          src="/assets/02-01.jpg"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="z-10 mr-[2.5%] text-[#f5f5f5]">
        <h1 className="text-right font-bold text-xl sm:text-3xl block">
          منصة
          <span className="text-[#8a7762] text-2xl sm:text-4xl">
            {" "}
            نَحْيَا بِالْقُرْآن{" "}
          </span>
          لتعليم قراءة القرآن الكريم
        </h1>
        <p className="mt-8 leading-[1.5rem] sm:leading-[2.5rem]  text-sm sm:text-[1.5rem] w-[85%] lg:w-[60%] ">
          مرحبًا بك في منصة تعليم قراءة القرآن الكريم. نقدم لك رحلة فريدة ومثيرة
          نحو إتقان فنون التلاوة واللفظ الصحيح. تتميز منصتنا بمجموعة من المميزات
          التي تجمع بين التكنولوجيا المبتكرة وجودة التعليم التقليدي.
        </p>
        <div className="flex sm:flex-row flex-col justify-start items-start mt-8 gap-8 sm:gap-0 ">
          <HashLink smooth to={"/#about"}>
            <button className="py-1 sm:py-2 px-2 sm:px-4  font-bold text-sm sm:text-xl bg-[#9F8565] hover:bg-[#886d4d]   text-slate-100 transition-all rounded-sm ">
              نبذة عنا
            </button>
          </HashLink>
          <HashLink smooth to={"/#teachers"}>
            <button className="py-1 sm:py-2 sm:px-4  sm:mr-8 font-bold text-sm sm:text-xl  hover:text-[#7a6347]   text-[#9F8565] transition-all rounded-sm">
              الذهاب إلى المعلمين
            </button>
          </HashLink>
        </div>
      </div>
    </div>
  );
}

export default Proposal;
