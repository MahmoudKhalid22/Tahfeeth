import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "./utilsComponents/Spinner";
import { AuthContext } from "../utils/context";
import BadRequest from "../pages/BadRequest";

function Details() {
  const { isLogin } = useContext(AuthContext);

  console.log(isLogin);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState({});

  const data = JSON.parse(localStorage.getItem("data"))
    ? JSON.parse(localStorage.getItem("data"))
    : null;

  // useEffect(() => {
  //   const getUserData = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await fetch(
  //         "https://tahfeeth-production.up.railway.app/user/me/",
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: "Bearer " + data?.accessToken,
  //           },
  //         }
  //       );
  //       if (!response.ok) {
  //         throw new Error();
  //       }

  //       const result = await response.json();
  //       setUserData(result[0]);
  //     } catch (err) {
  //       setError(true);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   getUserData();
  // }, [data?.accessToken]);

  if (!isLogin) {
    return <BadRequest />;
  }

  return (
    <div className="w-full md:w-[80%]  absolute left-0  mt-8">
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
              data.user?.avatar ? data.user?.avatar : "/assets/dummyImage.jpg"
            }
            alt={data.user?.name}
            className="rounded-full w-40 h-40 object-cover "
          />
          <p className="text-center text-xl sm:text-3xl text-[#43766C]">
            {data.user?.name}
          </p>
          <p className="text-center text-xl sm:text-3xl text-[#43766C]">
            {data.user?.role === "teacher"
              ? "معلم"
              : data.user?.role === "student"
              ? "طالب"
              : "مدير"}
          </p>
          <p className="text-center  text-xl sm:text-2xl font-semibold text-[#43766C]">
            {data.user?.professional ? "مجاز" : "غير مجاز"}
          </p>
          {data.user?.role === "student" && (
            <Link
              to={`/details/${data.user?._id}`}
              className="bg-[#8A7A5F] hover:bg-[#6e624c] transition-colors duration-300 text-[#ececec] rounded-md px-4 py-2"
            >
              عرض الجداول
            </Link>
          )}

          {data.user?.role === "teacher" && (
            <>
              <p className="text-center ml-4 text-xl sm:text-3xl font-bold text-[#43766C]">
                {data.user?.price} ج
              </p>

              <p className="text-center ml-2 text-md sm:text-xl   text-[#43766C] w-[95%] mt-4 sm:mt-12 leading-loose font-semibold">
                وصف طريقة التعليم
              </p>
              <p className="text-center ml-2 text-md sm:text-xl   text-[#43766C] lg:w-[50rem] w-[90%] leading-loose">
                {data.user?.information}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Details;
