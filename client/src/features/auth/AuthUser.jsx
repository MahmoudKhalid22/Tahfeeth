import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { GiExitDoor } from "react-icons/gi";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import Error from "../../ui/utils/Error";
import useNewUser from "./useNewUser";
import useLogin from "./useLogin";

function NewUser({ isLogin, role }) {
  const { register, formState, handleSubmit } = useForm();

  const { errors } = formState;

  const [showPassword, setShowPassword] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);

  const { isPending, createNewUser } = useNewUser();
  const { isPending: isLogging, loginUser } = useLogin();

  const submitNewUser = (data) => {
    createNewUser({
      name: data["name-1"],
      email: data["email-1"],
      password: data["pass-1"],
      role: data.role,
      professional: data.prof,
      price: data.price,
      information: data.information,
    });
  };

  const submitLogin = (data) => {
    loginUser({
      email: data["email-1"],
      password: data["pass-1"],
    });
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit(!isLogin ? submitNewUser : submitLogin)}
        className={`bg-none flex items-center
justify-center flex-col gap-6 p-4 ${
          role === "teacher" && !isLogin ? "mt-2" : ""
        } rounded-tr-xl rounded-br-xl  min-h-screen mb-[4rem] md:mb-0`}
      >
        <div className=" flex flex-col gap-6 justify-center items-end py-5">
          {!isLogin && (
            <>
              {/* NAME */}
              <div className="flex  items-center justify-between flex-row-reverse w-full">
                <div className="">
                  <input
                    type="text"
                    placeholder="الاسم"
                    id="name-1"
                    className="block text-md  border py-4 md:text-xl rounded-md border-slate-700  px-3  max-w-[30rem]  md:h-16"
                    {...register("name-1", {
                      required: "من فضلك أدخل اسمك",
                    })}
                  />
                  {errors["name-1"]?.message && (
                    <Error>{errors["name-1"]?.message}</Error>
                  )}
                </div>
                <label
                  className="hidden md:block text-[#43766C] text-2xl"
                  htmlFor="name-1"
                >
                  الاسم
                </label>
              </div>
            </>
          )}
          <div className="flex  flex-row-reverse w-full justify-between items-center">
            <div className="">
              <input
                type="text"
                placeholder="البريد الإلكتروني"
                id="email-1"
                className="block text-md  border py-4 md:text-xl rounded-md border-slate-700  px-3  max-w-[30rem]  md:h-16"
                {...register("email-1", {
                  required: "من فضلك أدخل بريدك الإلكتروني",
                })}
              />
              {errors["email-1"]?.message && (
                <Error>{errors["email-1"]?.message}</Error>
              )}
            </div>
            <label
              className="hidden md:block text-[#43766C] text-2xl"
              htmlFor="email-1"
            >
              البريد الإلكتروني
            </label>
          </div>
          <div className=" flex flex-row-reverse w-full justify-between items-center  relative">
            <div className="">
              <input
                type={!showPassword ? "password" : "text"}
                placeholder="كلمة السر"
                id="pass-1"
                className="block text-md  border py-4 md:text-xl rounded-md border-slate-700  px-3  max-w-[30rem]  md:h-16"
                {...register("pass-1", {
                  required: "من فضلك أدخل كلمة السر",
                })}
              />
              {errors["pass-1"]?.message && (
                <Error>{errors["pass-1"]?.message}</Error>
              )}
            </div>
            <div
              onClick={() => setShowPassword(!showPassword)}
              className=" absolute top-0 left-0 bottom-0 flex items-center ml-6 cursor-pointer text-3xl"
            >
              {showPassword ? <FaRegEyeSlash /> : <IoMdEye />}
            </div>
            <label
              className="hidden md:block text-[#43766C] text-2xl"
              htmlFor="pass-1"
            >
              كلمة السر
            </label>
          </div>
          {isLogin && (
            <div className="flex items-start justify-end ">
              <Link className="underline" to={"/forget-password"}>
                هل نسيت كلمة السر
              </Link>
            </div>
          )}
          {/* {!isLogin && (
            <div className=" flex flex-row-reverse w-full justify-between items-start  ">
              <div className="w-full">
                <select
                  type="text"
                  placeholder="الاسم"
                  id="role"
                  className="block text-md w-full border py-4 md:text-xl rounded-md border-slate-700  px-3  max-w-[30rem]  md:h-16"
                  {...register("role", {
                    required: "من فضلك حدد هل أنت طالب أم معلم",
                  })}
                  onChange={(e) => setIsTeacher(e.target.value === "teacher")}
                >
                  <option>التسجيل ك</option>
                  <option value={"teacher"}>معلم</option>
                  <option value={"student"}>طالب</option>
                </select>
                {errors["role"]?.message && (
                  <Error>{errors["role"]?.message}</Error>
                )}
              </div>
              <label
                className="hidden md:block text-[#43766C] text-2xl"
                htmlFor="role"
              >
                التسجيل كدورك
              </label>
            </div>
          )} */}
          {/* {!isLogin && isTeacher && (
            <>
              <div className=" flex flex-row-reverse w-full justify-center items-start ">
                <select
                  type="text"
                  placeholder="الاسم"
                  id="prof"
                  className="block text-md  border py-4 md:text-xl rounded-md border-slate-700  px-3 md:w-[50%] lg:w-[58%]  w-[120%] md:h-16"
                  {...register("prof", {
                    required: "من فضلك حدد هل أنت مجاز أم لا",
                  })}
                >
                  <option>هل أنت مجاز</option>
                  <option value={true}>نعم</option>
                  <option value={false}>لا</option>
                </select>
                <label
                  className="hidden md:block text-[#43766C] text-2xl"
                  htmlFor="prof"
                >
                  هل أنت مجاز
                </label>
              </div> */}

          {/* <div className=" flex flex-row-reverse w-full justify-between items-start ">
                <div className="w-full">
                  <input
                    type="number"
                    placeholder="السعر"
                    step={10}
                    id="price"
                    className="block text-md w-full border py-4 md:text-xl rounded-md border-slate-700  px-3  max-w-[30rem]  md:h-16"
                    {...register("price", {
                      required: "من فضلك أدخل الأجر الذي تتقاضاه شهريا",
                    })}
                  />
                  {errors.price?.message && (
                    <Error>{errors.price?.message}</Error>
                  )}
                </div>
                <label
                  className="hidden md:block text-[#43766C] text-2xl"
                  htmlFor="price"
                >
                  مقدار الأجر الذي تتقاضاه
                </label>
              </div> */}
          {/* <div className=" flex flex-row-reverse w-full justify-center items-start ">
                <div>
                  <textarea
                    type="number"
                    placeholder="معلومات عن كيفية تعليم الطلاب"
                    step={10}
                    id="information"
                    className="block text-md  border py-4 md:text-xl rounded-md border-slate-700  px-3 md:w-[50%] lg:w-[58%]  w-[120%] md:h-60"
                    {...register("information", {
                      required: "من فضلك أدخل معلومات عن كيفية إدارتك للدرس",
                    })}
                  />
                  {errors.information?.message && (
                    <Error>{errors.information.message}</Error>
                  )}
                </div>
                <label
                  className="hidden md:block text-[#43766C] text-2xl w-52"
                  htmlFor="information"
                >
                  معلومات عن كيفية تعليم الطلاب
                </label>
              </div> */}
          {/* </> */}
          {/* )} */}
        </div>
        <button
          className="md:py-4 py-2 px-4 md:px-0 bg-[#9F8565] hover:bg-[#8a7762] text-md md:text-2xl text-[#ececec] 
        duration-300 flex items-center justify-center gap-4 cursor-pointer rounded-md md:w-[50%] 
        max-w-[30rem] 
        "
          disabled={isPending}
        >
          <GiExitDoor />
          {isLogin ? (
            <span>{isLogging ? "تحميل..." : "دخول"}</span>
          ) : (
            <span>{isPending ? "تحميل..." : "تسجيل"}</span>
          )}
        </button>
        <p className="flex flex-col  text-center md:flex-row text-[#2b2121] md:text-[#43766C]">
          {isLogin ? (
            <div className="flex flex-col md:flex-row gap-4">
              <span>ليس لديك حساب بعد</span>
              <Link to="/register?mode=signup" className="underline">
                سجل حساب جديد الآن{" "}
              </Link>
            </div>
          ) : (
            <div className="flex gap-4">
              <span>لديك حساب بالفعل</span>
              <Link to="/register?mode=login" className="underline">
                سجل دخول الآن
              </Link>
            </div>
          )}
        </p>
      </form>
    </div>
  );
}

export default NewUser;
