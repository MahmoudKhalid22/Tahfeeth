import React, { useEffect, useState } from "react";
import Card from "./Teacher/Card";
import { Link } from "react-router-dom";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getTeachers = async () => {
      try {
        const response = await fetch(
          "https://tahfeeth-system.onrender.com/user/teachers"
        );
        setLoading(true);
        setError(false);
        const teachers = await response.json();
        if (!response.ok) {
          throw new Error(teachers);
        }
        setTeachers(teachers);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getTeachers();
  }, []);

  // const derivedTeachers =
  //   teachers.length > 6 ? Array.from(teachers => ) : teachers;

  return (
    <div
      id="teachers"
      className="mr-[3.75rem] sm:mr-[4.5rem] lg:mr-[17rem] py-8 "
    >
      <h3 className="text-center py-4 my-12 text-xl sm:text-3xl font-bold border-b-4 w-fit mx-auto border-black">
        المعلمون والقراء
      </h3>
      {!error && !loading && (
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
      {!error && !loading && teachers.length > 6 && (
        <button className="bg-[#43766C] hover:bg-[#2f534c] transition-colors text-md sm:text-xl block mx-auto px-4 py-2 font-semibold text-white my-8">
          <Link to="/teacher">المزيد من المعلمين</Link>
        </button>
      )}
      {!error && loading && (
        <p className="text-center font-semibold text-3xl text-[#43766C]">
          تحميل...
        </p>
      )}
      {error && !loading && (
        <p className="text-center font-semibold text-3xl text-rose-700">
          يوجد خطأ داخلي في السيرفر، للأسف لا يمكننا عرض المعلمين
        </p>
      )}
    </div>
  );
}

export default Teachers;
