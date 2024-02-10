import React from "react";
import Card from "./Teacher/Card";
import { Link } from "react-router-dom";

function Teachers() {
  return (
    <div
      id="teachers"
      className="mr-[3.75rem] sm:mr-[4.5rem] lg:mr-[17rem] py-8 "
    >
      <h3 className="text-center py-4 my-12 text-xl sm:text-3xl font-bold border-b-4 w-fit mx-auto border-black">
        المعلمون والقراء
      </h3>
      <div className="flex flex-wrap gap-4 lg:gap-8 justify-center">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <button className="bg-[#43766C] hover:bg-[#2f534c] transition-colors text-md sm:text-xl block mx-auto px-4 py-2 font-semibold text-white my-8">
        <Link to="/teacher">المزيد من المعلمين</Link>
      </button>
    </div>
  );
}

export default Teachers;