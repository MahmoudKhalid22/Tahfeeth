import React, { useState } from "react";
import Spinner from "../ui/utils/Spinner";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [inform, setInform] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your logic to handle the submission of the forget password form
    try {
      setLoading(true);
      setErr(false);
      const res = await fetch(
        "https://tahfeeth.onrender.com/user/forget-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      }
      setInform(true);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 w-full md:w-[80%] absolute left-0">
      <div className="max-w-md w-full bg-white shadow-md rounded-md p-8">
        <h2 className="text-2xl font-semibold mb-4">هل نسيت كلمة السر</h2>
        <p className="text-gray-600 mb-6">
          أدخل بريدك الإلكتروني وسوف نرسل لك رابط بإعادة تعيين كلمة السر
        </p>
        <form className="mb-6" onSubmit={handleSubmit}>
          <label htmlFor="email" className="block text-gray-700">
            البريد الإلكتروني
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="border border-gray-300 rounded-md px-4 py-2 w-full"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="mt-4 w-full bg-[#43766C] hover:bg-[#365e56] text-white py-2 rounded-md  transition duration-300"
          >
            إعادة تعيين كلمة السر{" "}
          </button>
          <div className="mt-4">
            {loading && <Spinner />}
            {err.length > 0 && (
              <p className="text-xl text-center text-red-600">{err}</p>
            )}
            {inform && (
              <p className="text-center text-green-500">
                تم إرسال الرابط إلى بريدك الإلكتروني ، من فضلك تفقد بريدك
              </p>
            )}
          </div>
        </form>
        <p className="text-gray-600 text-center">
          تذكرت كلمة السر{" "}
          <Link
            to="/register?mode=login"
            className="text-[#9F8565] hover:underline"
          >
            سجل الدخول من هنا{" "}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;
