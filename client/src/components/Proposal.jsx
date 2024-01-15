<<<<<<< HEAD
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
=======
import React from "react";
import { HashLink } from "react-router-hash-link/dist/react-router-hash-link.cjs.production";
>>>>>>> 8ff830d29d10f373db724f37cbed84ef75d33926

function Proposal() {
  const { pathname } = useLocation();
  console.log(pathname);

  return (
    <div
      id="home"
<<<<<<< HEAD
      className="mr-[22rem] pt-28 flex items-start min-h-screen text-center sm:text-right justify-start flex-col"
    >
      <h1 className="text-center sm:text-right font-bold text-xl sm:text-3xl block">
        منصة <span className="text-[#811919] text-4xl">نحيا بالقرآن</span>
        لتعليم قراءة القرآن الكريم
      </h1>
      <p className="mt-8 leading-[2.5rem]  text-sm sm:text-[1.5rem] sm:w-[60%] ">
=======
      className="mr-[22rem] pt-36 flex items-start min-h-screen text-center sm:text-right justify-start flex-col"
    >
      <h1 className="mb-8  text-center sm:text-right font-bold text-xl sm:text-3xl block">
        منصة <span className="text-[#811919] text-4xl">نحيا بالقرآن</span>{" "}
        لتعليم قراءة القرآن الكريم
      </h1>
      <p className="leading-[2.5rem]  text-sm sm:text-[1.5rem] sm:w-[60%] ">
>>>>>>> 8ff830d29d10f373db724f37cbed84ef75d33926
        مرحبًا بك في منصة تعليم قراءة القرآن الكريم. نقدم لك رحلة فريدة ومثيرة
        نحو إتقان فنون التلاوة واللفظ الصحيح. تتميز منصتنا بمجموعة من المميزات
        التي تجمع بين التكنولوجيا المبتكرة وجودة التعليم التقليدي.
      </p>
      <div>
<<<<<<< HEAD
        <Link to={"/#about"}>
          <button className="py-2 px-4 mt-8 font-bold text-xl bg-[#9F8565] hover:bg-[#886d4d]   text-slate-100 transition-all rounded-sm">
            نبذة عنا
          </button>
        </Link>
        <Link to={"#teacher"}>
          <button className="py-2 px-4 mt-8 font-bold text-xl  hover:text-[#644746]   text-[#5E4E3B] transition-all rounded-sm">
=======
        <HashLink smooth to={"/#about"}>
          <button className="py-2 px-4 mt-8  font-bold text-xl bg-[#9F8565] hover:bg-[#886d4d]   text-slate-100 transition-all rounded-sm">
            نبذة عنا
          </button>
        </HashLink>
        <HashLink smooth to={"/#teachers"}>
          <button className="py-2 px-4 mt-8 mr-8 font-bold text-xl  hover:text-[#644746]   text-[#5E4E3B] transition-all rounded-sm">
>>>>>>> 8ff830d29d10f373db724f37cbed84ef75d33926
            الذهاب إلى المعلمين
          </button>
        </HashLink>
      </div>
    </div>
  );
}

export default Proposal;
