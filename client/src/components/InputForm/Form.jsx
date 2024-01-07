import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { GiExitDoor } from "react-icons/gi";

function Form() {
  const [searchParams] = useSearchParams();

  const isLogin = searchParams.get("mode") === "login";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  // const [professional, setProfessional] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors
    setLoading(false);

    try {
      setLoading(true);
      const response = await fetch(
        "https://tahfeeth-system.onrender.com/users/login",
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
        const errorData = await response.json();
        setLoading(false);
        throw new Error(errorData.error);
      }

      setLoading(false);
      const dataUser = await response.json();
      localStorage.setItem("data", JSON.stringify(dataUser));
      navigate("/details");

      // Reset the form data
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form
      className="bg-none md:bg-gradient-to-r from-[#916f6e]  to-[#574342] flex items-center
    justify-center flex-col gap-6 p-4 rounded-tr-xl rounded-br-xl w-full md:w-1/2 md:h-[40rem]"
      onSubmit={handleSubmit}
    >
      {!isLogin && (
        <div className=" flex flex-row-reverse justify-between items-start w-full">
          <input
            type="text"
            placeholder="الاسم"
            id="name"
            className="text-base md:text-3xl rounded-xl border-none outline-none px-3 py-2 w-full md:w-2/3 h-16"
          />
          <label className="hidden md:block text-white text-2xl" htmlFor="name">
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
          className="text-base md:text-3xl rounded-xl border-none outline-none px-3 py-2 w-full md:w-2/3 h-16"
        />
        <label className="hidden md:block text-white text-2xl" htmlFor="email">
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
          className="text-base md:text-3xl rounded-xl border-none outline-none px-3 py-2 w-full md:w-2/3 h-16"
        />
        <label className="hidden md:block text-white text-2xl" htmlFor="pass">
          كلمة السر
        </label>
      </div>
      {!isLogin && (
        <div className=" flex flex-row-reverse justify-between items-start w-full">
          <select
            type="text"
            placeholder="الاسم"
            id="name"
            className="text-base md:text-3xl rounded-xl border-none outline-none px-3 py-2 w-full md:w-2/3 h-16"
            onChange={(e) => setRole(e.target.value)}
          >
            <option>التسجيل ك</option>
            <option>معلم</option>
            <option>طالب</option>
          </select>
          <label className="hidden md:block text-white text-2xl" htmlFor="name">
            التسجيل كدورك
          </label>
        </div>
      )}
      {!isLogin && role === "معلم" && (
        <div className=" flex flex-row-reverse justify-between items-start w-full">
          <select
            type="text"
            placeholder="الاسم"
            id="name"
            className="text-base md:text-3xl rounded-xl border-none outline-none px-3 py-2 w-full md:w-2/3 h-16"
          >
            <option>هل أنت مجاز</option>
            <option>نعم</option>
            <option>لا</option>
          </select>
          <label className="hidden md:block text-white text-2xl" htmlFor="name">
            هل أنت مجاز
          </label>
        </div>
      )}
      <p className="text-2xl text-red-800 md:text-red-500">{`${
        error ? error : ""
      }`}</p>
      {loading && (
        <p className="text-[#2b2121] md:text-white text-2xl font-semibold">
          تــحمــيل ...
        </p>
      )}
      <button className="p-2 border-none outline-none text-2xl cursor-pointer rounded-xl transition-colors flex gap-2 items-center justify-center w-full h-16 bg-[#916f6e] hover:bg-[#574342] md:bg-[#3a2c2c] md:hover:bg-[#1d1616] text-white">
        <GiExitDoor />
        {isLogin ? <span>دخول</span> : <span>تسجيل</span>}
      </button>
      <p className="flex flex-col items-center md:flex-row gap-4 text-[#2b2121] md:text-white">
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
  );
}

export default Form;
