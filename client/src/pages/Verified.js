import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Verified = () => {
  return (
    <div className="w-[80%] absolute left-0 h-screen flex flex-col text-center gap-8 items-center justify-center text-5xl">
      <FaCheckCircle className="fill-[#9F8565]" />
      <p>Congratulations! your email has been verified! you can login now</p>
      <Link
        to="/register?mode=login"
        className="bg-[#9F8565] hover:bg-[#8a7762] transition-colors px-5 py-3 w-48 text-white text-2xl hidden lg:block"
      >
        Login
      </Link>
    </div>
  );
};

export default Verified;
