import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const data = JSON.parse(localStorage.getItem("data"));

function Card({
  name,
  role,
  professional,
  avatar,
  price,
  id,
  multiple,
  information,
}) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const joinToTeacher = async () => {
    try {
      setLoading(true);
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
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col bg-white shadow-lg w-[50%] h-80 py-8 items-center justify-between">
        <div className="sm:w-32 sm:h-32 w-28 h-28 rounded-full flex items-center justify-center shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
          <img src={avatar} alt={name} className="rounded-full" />
        </div>
        <div className="flex flex-col items-center justify-center gap-2 mt-4">
          <p className="text-md sm:text-xl flex gap-2">
            <span className="font-semibold">{name}</span>
            <span>{professional ? "(مجاز)" : "(غير مجاز)"}</span>
          </p>
          <p className="text-xl font-semibold">{price} ج</p>
          {information && <div>{information}</div>}
          {multiple ? (
            <Link
              to={`/teacher/${id}`}
              className="bg-[#9F8565] hover:bg-[#7f6a51] transition-colors mt-4 text-white text-md sm:text-lg py-1 px-2"
            >
              عرض التفاصيل
            </Link>
          ) : (
            <button
              className="bg-[#9F8565] hover:bg-[#7f6a51] transition-colors mt-4 text-white text-md sm:text-lg py-1 px-2"
              onClick={joinToTeacher}
            >
              انضمام إلى المعلم
            </button>
          )}
        </div>
      </div>
      <div className="mt-12 absolute left-0 flex items-center justify-center w-[150%]">
        {error && !loading && (
          <p className="text-red-600 md:text-2xl w-fit text-center">{error}</p>
        )}
        {loading && <p className="text-2xl font-semibold mx-auto">تحميل...</p>}
        {!loading && message && <p>{message}</p>}
      </div>
    </>
  );
}

export default Card;
