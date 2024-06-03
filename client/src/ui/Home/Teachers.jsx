import React from "react";
import Card from "../../features/teacher/Card";
import { Link } from "react-router-dom";

import { useGetTeachers } from "../../features/settings/useGetTeachers";

function Teachers() {
  const { isPending, data: teachers, error } = useGetTeachers();

  return (
    <div id="teachers" className="py-8 ">
      <h3 className="text-center py-4 my-12 text-xl sm:text-3xl font-bold border-b-4 w-fit mx-auto border-black">
        المعلمون والقراء
      </h3>
      {!error && !isPending && (
        <div className="flex flex-wrap gap-4 lg:gap-8 justify-center">
          {teachers.length > 0 ? (
            teachers?.map((teacher) => (
              <Card
                key={teacher._id}
                id={teacher._id}
                name={teacher.name}
                role={teacher.role}
                professional={teacher.professional}
                price={teacher?.price}
                avatar={teacher?.avatar}
                multiple={true}
              />
            ))
          ) : (
            <h3 className="text-2xl font-semibold text-center text-red-600">
              لا يوجد معلمون
            </h3>
          )}
        </div>
      )}
      {!error && !isPending && teachers.length > 6 && (
        <button className="bg-[#43766C] hover:bg-[#2f534c] transition-colors text-md sm:text-xl block mx-auto px-4 py-2 font-semibold text-white my-8">
          <Link to="/teacher">المزيد من المعلمين</Link>
        </button>
      )}
      {!error && isPending && (
        <p className="text-center font-semibold text-3xl text-[#43766C]">
          تحميل...
        </p>
      )}
      {error && !isPending && (
        <p className="text-center  text-md text-rose-700">
          يوجد خطأ داخلي في السيرفر، للأسف لا يمكننا عرض المعلمين
        </p>
      )}
    </div>
  );
}

export default Teachers;
