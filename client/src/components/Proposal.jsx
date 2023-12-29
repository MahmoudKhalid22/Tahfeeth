import React from "react";

function Proposal() {
  return (
    <div className="flex items-start h-96 mt-16 sm:mt-8 text-center sm:text-right justify-center flex-col">
      <h1 className="mx-auto sm:mr-8  text-center sm:text-right font-bold text-xl sm:text-3xl block">
        منصة <span className="text-[#916f6e] text-4xl">نحيا بالقرآن</span>{" "}
        لتحفيظ القرآن الكريم
      </h1>
      <p className="sm:mr-8 mt-8 leading-[2.5rem] font-bold text-sm sm:text-[1.5rem] sm:w-[60%]  font-serif">
        منصة تحفيظ القرآن التي نقدمها تعكس التزامنا بتوفير تجربة مميزة
        للمستخدمين الذين يسعون لتحفيظ القرآن الكريم. تعتمد المنصة على
        التكنولوجيا لتقديم بيئة تعلم متقدمة وتفاعلية، تساعد المستخدمين في تحقيق
        أهدافهم بفعالية. تتيح المنصة للمستخدمين تخصيص دروسهم ومتابعة تقدمهم،
        وتقديم إحصائيات مفصلة حول أدائهم. يمكن الوصول إلى المنصة على مدار الساعة
        من أي مكان، مما يسهل على الأفراد تنظيم وقتهم بشكل أفضل
      </p>
    </div>
  );
}

export default Proposal;
