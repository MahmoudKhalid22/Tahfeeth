import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "./utilsComponents/Spinner";

function Details({ onSetIsLogin }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [teacherData, setTeacherData] = useState({});

  const data = JSON.parse(localStorage.getItem("data"))
    ? JSON.parse(localStorage.getItem("data"))
    : null;

  useEffect(() => {
    const getOneTeacher = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://tahfeeth-system.onrender.com/user/teacher/" + data?.user?._id
        );
        if (!response.ok) {
          throw new Error();
        }

        const result = await response.json();
        // console.log(result);
        setTeacherData(result);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getOneTeacher();
  }, [data?.user?._id]);

  if (!data || data.length === 0) {
    return (
      <div className="overflow-hidden h-screen w-[80%] absolute left-0 flex flex-col items-center justify-center">
        <h2 className="text-red-700 text-3xl font-semibold text-center overflow-y-hidden">
          يجب تسجيل الدخول
        </h2>
        <Link
          to="/register?mode=login"
          className="text-white bg-[#959689] text-3xl font-semibold text-center mx-auto block mt-12 w-fit p-4 rounded-lg hover:bg-[#67685e] transition-colors"
        >
          تسجيل الدخول
        </Link>
      </div>
    );
  }

  return (
    <div className="w-[80%]  absolute left-0  mt-8">
      {error ? (
        <p className="text-red-600 font-semibold text-2xl mx-auto text-center">
          حدث بعض الخطأ
        </p>
      ) : loading ? (
        <Spinner />
      ) : (
        <div className="w-full absolute left-0 flex flex-col items-center justify-center gap-2 sm:gap-4">
          <img
            src={
              teacherData?.avatar
                ? teacherData?.avatar
                : "/assets/dummyImage.jpg"
            }
            alt={teacherData?.name}
            className="rounded-full w-40 h-40 object-cover ml-3"
          />
          <p className="text-center ml-4 text-xl sm:text-3xl text-[#43766C]">
            {teacherData.name}
          </p>
          <p className="text-center ml-4 text-xl sm:text-3xl text-[#43766C]">
            {teacherData.role === "teacher" ? "معلم" : "مدير"}
          </p>
          <p className="text-center ml-4 text-xl sm:text-3xl font-semibold text-[#43766C]">
            {teacherData.professional ? "مجاز" : "غير مجاز"}
          </p>
          <p className="text-center ml-4 text-xl sm:text-3xl font-bold text-[#43766C]">
            {teacherData.price} ج
          </p>
          <p className="text-center ml-2 text-md sm:text-xl   text-[#43766C] w-[95%] mt-4 sm:mt-12 leading-loose font-semibold">
            وصف طريقة التعليم
          </p>
          <p className="text-center ml-2 text-md sm:text-xl   text-[#43766C] lg:w-[50rem] w-[90%] leading-loose">
            {teacherData.information}
          </p>
        </div>
      )}
    </div>
  );
}

export default Details;
