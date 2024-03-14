import React from "react";
import { Link } from "react-router-dom";

function Card({ name, role, professional, avatar, price, id, information }) {
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

          <Link
            to={`/teacher/${id}`}
            className="bg-[#9F8565] hover:bg-[#7f6a51] transition-colors mt-4 text-white text-md sm:text-lg py-1 px-2"
          >
            عرض التفاصيل
          </Link>
        </div>
      </div>
    </>
  );
}

export default Card;
