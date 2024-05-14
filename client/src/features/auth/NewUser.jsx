import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { GiExitDoor } from "react-icons/gi";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import Error from "../../ui/utils/Error";

function NewUser({ isLogin, role }) {
  const { register, formState, handleSubmit } = useForm();

  const { errors } = formState;

  const [showPassword, setShowPassword] = useState(false);

  const submit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(submit)}
        className={`bg-none flex items-center
justify-center flex-col gap-6 p-4 ${
          role === "teacher" && !isLogin ? "mt-2" : ""
        } rounded-tr-xl rounded-br-xl w-full  mb-[11.5rem] md:mb-0`}
      >
        {!isLogin && (
          <div className=" flex flex-row-reverse justify-between items-start w-full">
            <div>
              <input
                type="text"
                placeholder="الاسم"
                id="name-1"
                className="text-md  border py-4 md:text-xl rounded-md border-slate-700  px-3 md:w-[50%] lg:w-[58%]  w-[100%]  md:h-16"
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
              htmlFor="name"
            >
              الاسم
            </label>
          </div>
        )}
        <div className="flex flex-row-reverse justify-between items-start w-full">
          <div>
            <input
              type="text"
              placeholder="البريد الإلكتروني"
              id="email-1"
              className="text-md  border py-4 md:text-xl rounded-md border-slate-700  px-3 md:w-[50%] lg:w-[58%]  w-[120%] md:h-16"
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
            htmlFor="email"
          >
            البريد الإلكتروني
          </label>
        </div>
        <div className=" flex flex-row-reverse justify-between items-start w-full relative">
          <div>
            <input
              type={!showPassword ? "password" : "text"}
              placeholder="كلمة السر"
              id="pass-1"
              className="text-md  border py-4 md:text-xl rounded-md border-slate-700  px-3 md:w-[50%] lg:w-[58%]  w-[120%] md:h-16"
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
            className=" absolute top-0 left-0 bottom-0 flex items-center pl-3 cursor-pointer text-3xl"
          >
            {showPassword ? <FaRegEyeSlash /> : <IoMdEye />}
          </div>
          <label
            className="hidden md:block text-[#43766C] text-2xl"
            htmlFor="pass"
          >
            كلمة السر
          </label>
        </div>
        {isLogin && (
          <div className="flex items-center justify-end w-full">
            <Link className="underline" to={"/forget-password"}>
              هل نسيت كلمة السر
            </Link>
          </div>
        )}
        {!isLogin && (
          <div className=" flex flex-row-reverse justify-between items-start w-full">
            <div>
              <select
                type="text"
                placeholder="الاسم"
                id="role"
                className="text-md  border py-4 md:text-xl rounded-md border-slate-700  px-3 md:w-[50%] lg:w-[58%]  w-[120%] md:h-16"
                {...register("role", {
                  required: "من فضلك حدد هل أنت طالب أم معلم",
                })}
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
        )}
        {!isLogin && role === "teacher" && (
          <div className=" flex flex-row-reverse justify-between items-start w-full">
            <select
              type="text"
              placeholder="الاسم"
              id="prof"
              className="text-md  border py-4 md:text-xl rounded-md border-slate-700  px-3 md:w-[50%] lg:w-[58%]  w-[120%] md:h-16"
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
          </div>
        )}
        {!isLogin && role === "teacher" && (
          <>
            <div className=" flex flex-row-reverse justify-between items-start w-full">
              <input
                type="number"
                placeholder="السعر"
                step={10}
                id="price"
                className="text-md  border py-4 md:text-xl rounded-md border-slate-700  px-3 md:w-[50%] lg:w-[58%]  w-[120%] md:h-16"
                {...register("price", {
                  required: "من فضلك أدخل الأجر الذي تتقاضاه شهريا",
                })}
              />
              <label
                className="hidden md:block text-[#43766C] text-2xl"
                htmlFor="price"
              >
                مقدار الأجر الذي تتقاضاه
              </label>
            </div>
            <div className=" flex flex-row-reverse justify-between items-start w-full">
              <textarea
                type="number"
                placeholder="معلومات عن كيفية تعليم الطلاب"
                step={10}
                id="information"
                className="text-md  border py-4 md:text-xl rounded-md border-slate-700  px-3 md:w-[50%] lg:w-[58%]  w-[120%] md:h-60"
                {...register("information", {
                  required: "من فضلك أدخل معلومات عن كيفية إدارتك للدرس",
                })}
              />
              <label
                className="hidden md:block text-[#43766C] text-2xl w-52"
                htmlFor="information"
              >
                معلومات عن كيفية تعليم الطلاب
              </label>
            </div>
          </>
        )}

        <button className="p-2 border-slate-700  text-xl md:text-2xl cursor-pointer rounded-md transition-colors flex gap-2 items-center justify-center w-full md:h-16 bg-[#9F8565] hover:bg-[#8a7762] text-[#ececec] duration-300">
          <GiExitDoor />
          {isLogin ? <span>دخول</span> : <span>تسجيل</span>}
        </button>
        <p className="flex flex-col items-center md:flex-row gap-4 text-[#2b2121] md:text-[#43766C]">
          {isLogin ? (
            <>
              <span>ليس لديك حساب بعد</span>
              <Link to="/register?mode=signup" className="underline">
                سجل حساب جديد الآن{" "}
              </Link>
            </>
          ) : (
            <>
              <span>لديك حساب بالفعل</span>
              <Link to="/register?mode=login" className="underline">
                سجل دخول الآن{" "}
              </Link>
            </>
          )}
        </p>
      </form>
    </div>
  );
}

export default NewUser;
