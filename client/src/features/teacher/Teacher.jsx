import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import StudentCard from "../../components/StudentCard";
import Spinner from "../../ui/utils/Spinner";
import { useTeacher } from "./useTeacher";
import { useGetStudents } from "../settings/useGetStudents";
import Cookies from "js-cookie";

const data = JSON.parse(localStorage.getItem("data"));
const adminToken = data?.user?.role === "admin" ? data?.accessToken : null;

const Teacher = () => {
  const { id } = useParams();

  const { isPending, data: teacherData, error } = useTeacher(id);

  const [search] = useSearchParams();

  const isAdmin = search.get("admin");

  const [loadingJoin, setLoadingJoin] = useState(false);
  const [errJoin, setErrJoin] = useState(false);
  const [stdDisplay, setStdDisplay] = useState(false);

  const [message, setMessage] = useState("");

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

  const {
    isPending: isPendingStd,
    data: students,
    error: stdErr,
  } = useGetStudents(id, Cookies.get("accessToken"));

  return (
    <div className="w-full mb-[11.5] md:mb-0 md:w-[75%]  absolute left-0 h-full mt-8">
      {error ? (
        <p className="text-red-600 font-semibold text-2xl w-full mx-auto text-center">
          حدث بعض الخطأ
        </p>
      ) : isPending ? (
        <p className="text-slate-600 font-semibold text-2xl w-full mx-auto text-center">
          تحميل...
        </p>
      ) : (
        <div className="w-full absolute left-0 flex flex-col items-center justify-center gap-2 sm:gap-4">
          <img
            src={
              teacherData?.teacher?.avatar
                ? teacherData?.teacher?.avatar
                : "/assets/dummyImage.jpg"
            }
            alt={teacherData?.teacher?.name}
            className="rounded-full w-40 h-40 object-cover ml-3"
          />
          <p className="text-center text-xl sm:text-3xl text-[#43766C]">
            ش / {teacherData?.teacher?.name}
          </p>
          <p className="text-center text-xl sm:text-3xl text-[#43766C]">
            {teacherData?.teacher?.role === "teacher"
              ? "معلم"
              : teacherData?.teacher?.role === "مدير"
              ? "مدير"
              : "خطأ"}
          </p>
          <p className="text-center text-xl sm:text-3xl font-semibold text-[#43766C]">
            {teacherData?.teacher?.professional ? "مجاز" : "غير مجاز"}
          </p>

          <p className="text-center text-xl sm:text-3xl font-bold text-[#43766C]">
            {teacherData?.teacher?.price} ج
          </p>
          <div className="flex items-center gap-2 text-center text-xl sm:text-xl text-[#43766C]">
            <p>عدد الطلاب :</p>
            <span className="text-2xl font-semibold">
              {teacherData?.studentsNumber}
            </span>
          </div>
          <div className="text-center ml-2 text-md sm:text-xl   text-[#43766C] w-[95%] mt-4 sm:mt-6 leading-loose">
            <p className="text-2xl font-semibold mb-4">كيفية إدارة الحصة</p>
            <p>{teacherData?.teacher?.information}</p>
          </div>

          {isAdmin ? (
            <>
              <button
                className="bg-[#9F8565] hover:bg-[#7f6a51] transition-colors text-white text-md sm:text-lg py-1 px-2 rounded-md"
                onClick={() => setStdDisplay(!stdDisplay)}
              >
                عرض الطلاب
              </button>
              {teacherData?.studentsNumber <= 0 && (
                <p className="text-zinc-700 font-semibold text-2xl">
                  لا يوجد طلاب حتى الآن
                </p>
              )}
              {isPendingStd ? (
                <Spinner />
              ) : stdErr ? (
                <p className="text-red-600 font-semibold text-2xl">
                  حدث بعض الخطأ
                </p>
              ) : (
                stdDisplay &&
                students && (
                  <div className="flex gap-4 flex-wrap">
                    {students?.map((student) => (
                      <StudentCard key={student?._id} student={student} />
                    ))}
                  </div>
                )
              )}
            </>
          ) : (
            <button
              className="bg-[#9F8565] hover:bg-[#7f6a51] transition-colors ml-6 mt-4 text-white text-md sm:text-lg py-1 px-2 rounded-md"
              onClick={joinToTeacher}
            >
              انضمام إلى المعلم
            </button>
          )}

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
