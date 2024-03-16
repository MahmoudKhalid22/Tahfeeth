import React, { useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "./utilsComponents/Spinner";

const StudentCard = ({ student, teacherToken }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const fireStd = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://tahfeeth-system.onrender.com/user/student/" + student._id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + teacherToken,
          },
        }
      );
      if (!res.ok) {
        throw new Error("حدث بعض الخطأ");
      }
      window.location.reload();
    } catch (err) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col p-4 flex-wrap justify-around px-8 my-4 w-[15rem] sm:w-auto">
      <div className="flex items-center justify-between mb-2 gap-6 flex-col">
        <div className="sm:w-16 sm:h-16 w-28 h-28 rounded-full flex items-center justify-center shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
          <img
            src={student?.avatar ? student?.avatar : "/assets/dummyImage.jpg"}
            alt={student?.name}
            className="rounded-full w-full h-full object-cover"
          />
        </div>
        <h2 className="text-sm md:text-xl font-bold text-gray-800">
          {student?.name}
        </h2>
      </div>
      <p className="text-gray-700 text-base"></p>
      <div className="flex mt-4 gap-2 justify-between items-center">
        <Link
          to={`/details/${student._id}`}
          type="button"
          className="px-3 py-2 text-lg font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors focus:ring-blue-500"
        >
          جداول
        </Link>

        <button
          type="button"
          className="px-3 py-2 text-lg font-medium text-white bg-[#b84040] hover:bg-[#c92a2a] focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors "
          onClick={fireStd}
        >
          طرد
        </button>
      </div>
      {loading && <Spinner />}
      {error && !loading && (
        <p className="mt-6 mx-auto text-red-600">حدث بعض الخطأ</p>
      )}
    </div>
  );
};

export default StudentCard;
