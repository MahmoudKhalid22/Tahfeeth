import React from "react";
import { Link } from "react-router-dom";

const BadRequest = () => {
  return (
    <div className="mx-auto flex items-center justify-center w-full md:w-[80%] absolute left-0 flex-col gap-6 min-h-screen pb-12 md:pb-0">
      <h2 className="text-red-600">يجب تسجيل الدخول أولا</h2>
      <Link
        className="bg-[#9F8565] hover:bg-[#8a7762] transition-colors px-4 py-2 text-white text-md block"
        to="/register?mode=login"
      >
        سجل دخول
      </Link>
    </div>
  );
};

export default BadRequest;
