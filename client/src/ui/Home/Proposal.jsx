import React, { useState } from "react";
import { HashLink } from "react-router-hash-link";

function Proposal({ onSetActiveLink, observer }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      id="home"
      className=" relative pt-28 flex items-start min-h-screen text-right justify-start flex-col overflow-x-hidden"
    >
      {/* Blurred image */}
      <div className=" home absolute top-0 left-0 w-full h-screen overflow-hidden">
        <div>
          <img
            src="/assets/blurred.webp"
            alt="background"
            loading="lazy"
            className={`w-full h-full object-cover ${
              loaded
                ? "opacity-0 -z-10 absolute"
                : "opacity-1 transition-opacity duration-500"
            }`}
            onLoad={() => setLoaded(true)}
          />
        </div>
        <picture>
          <source
            type="image/webp"
            srcSet="
          /assets/02-01.webp,
          /assets/02-01.webp?width=200 200vw,
          /assets/02-01.webp?width=400 400vw,
          /assets/02-01.webp?width=800 800vw,          
          "
            className={`w-full h-full object-cover ${
              loaded ? "opacity-1 transition-opacity duration-500" : "opacity-0"
            }`}
          />
          <img
            alt="background"
            loading="lazy"
            role="presentation"
            decoding="async"
            fetchPriority="high"
            srcSet="
            /assets/02-01.webp?width=100 100w
            /assets/02-01.jpg?width=200 200w
            /assets/02-01.jpg?width=400 400w
            /assets/02-01.jpg?width=800 800w            
            "
            className={`w-full h-full object-cover ${
              loaded ? "opacity-1 transition-opacity duration-500" : "opacity-0"
            }`}
          />
        </picture>
      </div>
      <div className="px-6 z-10 mr-[2.5%] text-[#f5f5f5]">
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
