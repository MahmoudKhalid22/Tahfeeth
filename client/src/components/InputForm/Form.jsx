import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { GiExitDoor } from "react-icons/gi";
import { FaGooglePlus, FaFacebook } from "react-icons/fa";

function Form({ onSetIsLogin }) {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [professional, setProfessional] = useState(false);
  const [price, setPrice] = useState(0);
  const [information, setInformation] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const newUser = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(false);
    try {
      setLoading(true);
      const response = await fetch(
        "https://tahfeeth-system.onrender.com/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            role: role,
            professional: professional ? professional : null,
            price: price ? price : 0,
            information: information ? information : "",
          }),
        }
      );

      if (!response.ok) {
        setLoading(false);
        const errorData = await response.json();
        // console.log(errorData);
        throw new Error(errorData.err);
      }
      setName("");
      setEmail("");
      setPassword("");
      setRole("");
      setLoading(false);

      // const dataUser = await response.json();
      // console.log(dataUser);
      navigate("/verify");
    } catch (err) {
      // console.log(err.message);

      setError(
        err.message[0] === "E"
          ? "هذا البريد الإلكتروني موجود مسبقا ، حاول ببريد إلكتروني آخر"
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  // console.log(isLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(false);

    try {
      setLoading(true);
      const response = await fetch(
        "https://tahfeeth-system.onrender.com/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );
      setError(null);
      if (!response.ok) {
        setLoading(false);
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      // setLoading(false);
      const dataUser = await response.json();
      onSetIsLogin(true);
      localStorage.setItem("data", JSON.stringify(dataUser));
      navigate("/details");
      // Reset the form data
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const response = await fetch(
        "https://tahfeeth-system.onrender.com/user/auth/google"
      );
      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className={`bg-none flex items-center
    justify-center flex-col gap-6 p-4 ${
      role === "teacher" && !isLogin ? "mt-80" : "mt-8"
    } rounded-tr-xl rounded-br-xl w-full md:w-full md:h-[40rem]`}
      onSubmit={isLogin ? handleSubmit : newUser}
      style={{ width: "80%" }}
    >
      {!isLogin && (
        <div className=" flex flex-row-reverse justify-between items-start w-full">
          <input
            type="text"
            placeholder="الاسم"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-md  border py-4 md:text-xl rounded-md border-slate-700  px-3 md:w-[50%] lg:w-[58%]  w-[100%]  md:h-16"
          />
          <label
            className="hidden md:block text-[#43766C] text-2xl"
            htmlFor="name"
          >
            الاسم
          </label>
        </div>
      )}
      <div className="flex flex-row-reverse justify-between items-start w-full">
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="البريد الإلكتروني"
          id="email"
          className="text-md  border py-4 md:text-xl rounded-md border-slate-700  px-3 md:w-[50%] lg:w-[58%]  w-[120%] md:h-16"
        />
        <label
          className="hidden md:block text-[#43766C] text-2xl"
          htmlFor="email"
        >
          البريد الإلكتروني
        </label>
      </div>
      <div className=" flex flex-row-reverse justify-between items-start w-full">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="كلمة السر"
          id="pass"
          className="text-md  border py-4 md:text-xl rounded-md border-slate-700  px-3 md:w-[50%] lg:w-[58%]  w-[120%] md:h-16"
        />
        <label
          className="hidden md:block text-[#43766C] text-2xl"
          htmlFor="pass"
        >
          كلمة السر
        </label>
      </div>
      {!isLogin && (
        <div className=" flex flex-row-reverse justify-between items-start w-full">
          <select
            type="text"
            placeholder="الاسم"
            id="role"
            className="text-md  border py-4 md:text-xl rounded-md border-slate-700  px-3 md:w-[50%] lg:w-[58%]  w-[120%] md:h-16"
            onChange={(e) => setRole(e.target.value)}
          >
            <option>التسجيل ك</option>
            <option value={"teacher"}>معلم</option>
            <option value={"student"}>طالب</option>
          </select>
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
            onChange={(e) => setProfessional(e.target.value)}
            className="text-md  border py-4 md:text-xl rounded-md border-slate-700  px-3 md:w-[50%] lg:w-[58%]  w-[120%] md:h-16"
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
              onChange={(e) => setPrice(e.target.value)}
              className="text-md  border py-4 md:text-xl rounded-md border-slate-700  px-3 md:w-[50%] lg:w-[58%]  w-[120%] md:h-16"
            />
            <label
              className="hidden md:block text-[#43766C] text-2xl"
              htmlFor="price"
            >
              مقدار الأجر الذي تتقاضاه{" "}
            </label>
          </div>
          <div className=" flex flex-row-reverse justify-between items-start w-full">
            <textarea
              type="number"
              placeholder="معلومات عن كيفية تعليم الطلاب"
              step={10}
              id="price"
              onChange={(e) => setInformation(e.target.value)}
              className="text-md  border py-4 md:text-xl rounded-md border-slate-700  px-3 md:w-[50%] lg:w-[58%]  w-[120%] md:h-60"
            />
            <label
              className="hidden md:block text-[#43766C] text-2xl w-52"
              htmlFor="price"
            >
              معلومات عن كيفية تعليم الطلاب{" "}
            </label>
          </div>
        </>
      )}

      <p className="text-2xl text-red-800 text-center md:text-red-500">{`${
        error ? error : ""
      }`}</p>
      {loading && (
        <p className="text-[#2b2121] md:text-[#43766C] text-2xl font-semibold">
          تــحمــيل ...
        </p>
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

      <div className="flex gap-12">
        <button onClick={handleGoogleRegister}>
          <FaGooglePlus className="text-5xl fill-green-600 " />
        </button>
        <button>
          <FaFacebook className="text-5xl fill-green-600 " />
        </button>
      </div>
    </form>
  );
}

export default Form;
