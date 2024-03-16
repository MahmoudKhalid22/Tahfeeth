import React, { useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../utilsComponents/Spinner";

function Card({
  name,
  role,
  professional,
  avatar,
  price,
  id,
  information,
  admin,
  adminToken,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const deleteTeacher = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/user/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + adminToken,
        },
      });
      if (!response.ok) {
        throw new Error(await response.json());
      }
      window.location.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col bg-white shadow-lg w-[80%] sm:w-52 h-80 py-8 items-center justify-between">
        <div className="sm:w-32 sm:h-32 w-28 h-28 rounded-full flex items-center justify-center shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
          <img
            src={avatar ? avatar : "/assets/dummyImage.jpg"}
            alt={name}
            className="rounded-full w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-2 mt-4">
          <p className="text-md sm:text-xl flex gap-2">
            <span className="font-semibold">{name}</span>
            <span>{professional ? "(مجاز)" : "(غير مجاز)"}</span>
          </p>
          <p className="text-xl font-semibold">{price} ج</p>
          {information && <div>{information}</div>}

          {admin ? (
            <div className="flex gap-4">
              <button className="text-sm bg-[#43766C] hover:bg-[#34665c] transition-colors mt-4 text-white sm:text-md py-1 px-2">
                <Link to={`/teacher/${id}?admin=true`}>معلومات</Link>
              </button>

              <button className="text-sm bg-[#9F8565] hover:bg-[#9F8565] transition-colors mt-4 text-white sm:text-md py-1 px-2">
                حظر
              </button>
              <button
                className="text-sm bg-red-700 hover:bg-red-800 transition-colors mt-4 text-white sm:text-md py-1 px-2"
                onClick={deleteTeacher}
              >
                حذف
              </button>
            </div>
          ) : (
            <Link
              to={`/teacher/${id}`}
              className="bg-[#9F8565] hover:bg-[#9F8565] transition-colors mt-4 text-white text-md sm:text-lg py-1 px-2"
            >
              عرض التفاصيل
            </Link>
          )}
          {loading && <Spinner />}
          {error && (
            <p className="text-red-600 font-semibold text-2xl mt-6">{error}</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Card;
