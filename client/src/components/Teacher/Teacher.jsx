import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const data = JSON.parse(localStorage.getItem("data"));

const Teacher = () => {
  const { id } = useParams();
  const [teacherData, setTeacherData] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingJoin, setLoadingJoin] = useState(false);
  const [errJoin, setErrJoin] = useState(false);
  const [error, setError] = useState("");

  const [message, setMessage] = useState("");

  useEffect(() => {
    const getOneTeacher = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:5000/user/teacher/" + id
        );
        if (!response.ok) {
          throw new Error();
        }

        const result = await response.json();
        setTeacherData(result);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getOneTeacher();
  }, [id]);

  const joinToTeacher = async () => {
    try {
      setLoadingJoin(true);
      const response = await fetch(
        "https://tahfeeth-system.onrender.com/user/join/" + id,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.accessToken,
          },
        }
      );
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.err);
      }
      const result = await response.json();
      if (result) {
        setMessage("تمت إضافتك للمعلم");
      }
    } catch (err) {
      setErrJoin(err.message);
    } finally {
      setLoadingJoin(false);
    }
  };
  console.log(teacherData);
  return (
    <div className="w-[80%] sm:w-[55%] md:w-[53%] lg:w-[95%] absolute left-0 h-full mt-8">
      {error ? (
        <p className="text-red-600 font-semibold text-2xl">حدث بعض الخطأ</p>
      ) : loading ? (
        <p className="text-slate-600 font-semibold text-2xl">تحميل...</p>
      ) : (
        <div className="w-full sm:w-[80%] absolute left-0 flex flex-col items-center justify-center gap-2 sm:gap-4">
          <img
            src={
              teacherData?.teacher?.avatar
                ? teacherData?.teacher?.avatar
                : "/assets/dummyImage.jpg"
            }
            alt={teacherData?.teacher?.name}
            className="rounded-full w-40 h-40 object-cover ml-3"
          />
          <p className="text-center ml-4 text-xl sm:text-3xl text-[#43766C]">
            ش / {teacherData?.teacher?.name}
          </p>
          <p className="text-center ml-4 text-xl sm:text-3xl text-[#43766C]">
            {teacherData?.teacher?.role === "teacher"
              ? "معلم"
              : teacherData?.teacher?.role === "مدير"
              ? "مدير"
              : "خطأ"}
          </p>
          <p className="text-center ml-4 text-xl sm:text-3xl font-semibold text-[#43766C]">
            {teacherData?.teacher?.professional ? "مجاز" : "غير مجاز"}
          </p>

          <p className="text-center ml-4 text-xl sm:text-3xl font-bold text-[#43766C]">
            {teacherData?.teacher?.price} ج
          </p>
          <p className="text-center ml-4 text-xl sm:text-xl text-[#43766C]">
            عدد الطلاب / {teacherData?.studentsNumber}
          </p>
          <p className="text-center ml-2 text-md sm:text-xl   text-[#43766C] w-[95%] mt-4 sm:mt-12 leading-loose">
            {teacherData?.teacher?.information}
          </p>
          <button
            className="bg-[#9F8565] hover:bg-[#7f6a51] transition-colors ml-6 mt-4 text-white text-md sm:text-lg py-1 px-2"
            onClick={joinToTeacher}
          >
            انضمام إلى المعلم
          </button>
          <div className="mt-2">
            {errJoin && !loadingJoin && (
              <p className="text-red-600 md:text-2xl w-fit text-center ml-6">
                {errJoin}
              </p>
            )}
            {loadingJoin && (
              <p className="text-2xl font-semibold ml-6">تحميل...</p>
            )}
            {!loadingJoin && message && (
              <p className="text-2xl font-semibold ml-6">{message}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Teacher;
