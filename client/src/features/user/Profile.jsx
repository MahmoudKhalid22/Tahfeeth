import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../ui/utils/Spinner";
import { AuthContext } from "../../utils/context";
import BadRequest from "../../ui/utils/BadRequest";
import { useAvatar, useUser } from "./useUser";
import Cookies from "js-cookie";
import { QueryClient } from "@tanstack/react-query";

function Profile() {
  const { isLogin } = useContext(AuthContext);
  const token = Cookies.get("accessToken");
  const queryClient = new QueryClient();

  // const cachedData = queryClient.getQueryData("users");

  // console.log(cachedData);

  let { isPending, data, error } = useUser(token);
  const { isPendingAvatar, avatar, avatarErr } = useAvatar(token);
  data = data ? data[0] : null;

  if (!isLogin) {
    return <BadRequest />;
  }

  return (
    <div className="w-full md:w-[80%]  absolute left-0  mt-8">
      {error ? (
        <p className="text-red-600 font-semibold text-2xl mx-auto text-center">
          حدث بعض الخطأ
        </p>
      ) : isPending ? (
        <Spinner />
      ) : (
        <div className="w-full absolute left-0 flex flex-col items-center justify-center gap-2 sm:gap-4">
          <img
            src={avatar ? avatar : "/assets/dummyImage.jpg"}
            alt={data.name}
            className="rounded-full w-40 h-40 object-cover "
          />
          <p className="text-center text-xl sm:text-3xl text-[#43766C]">
            {data.name}
          </p>
          <p className="text-center text-xl sm:text-3xl text-[#43766C]">
            {data.role === "teacher"
              ? "معلم"
              : data.user?.role === "student"
              ? "طالب"
              : "مدير"}
          </p>
          <p className="text-center  text-xl sm:text-2xl font-semibold text-[#43766C]">
            {data.professional ? "مجاز" : "غير مجاز"}
          </p>
          {data.role === "student" && (
            <Link
              to={`/details/${data._id}`}
              className="bg-[#8A7A5F] hover:bg-[#6e624c] transition-colors duration-300 text-[#ececec] rounded-md px-4 py-2"
            >
              عرض الجداول
            </Link>
          )}

          {data.role === "teacher" && (
            <>
              <p className="text-center ml-4 text-xl sm:text-3xl font-bold text-[#43766C]">
                {data.price} ج
              </p>

              <p className="text-center ml-2 text-md sm:text-xl   text-[#43766C] w-[95%] mt-4 sm:mt-12 leading-loose font-semibold">
                وصف طريقة التعليم
              </p>
              <p className="text-center ml-2 text-md sm:text-xl   text-[#43766C] lg:w-[50rem] w-[90%] leading-loose">
                {data.information}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
