import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";

const Teacher = () => {
  const { id } = useParams();
  const [teacherData, setTeacherData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const getOneTeacher = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://tahfeeth-system.onrender.com/user/teacher/" + id
        );
        if (!response.ok) {
          throw new Error();
        }

        const result = await response.json();
        // console.log(result);
        setTeacherData(result);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getOneTeacher();
  }, [id]);
  return (
    <div className="w-[60%] sm:w-[55%] md:w-[53%] lg:w-[45%] absolute left-0 h-full mt-20">
      {error ? (
        <p className="text-red-600 font-semibold text-2xl">حدث بعض الخطأ</p>
      ) : loading ? (
        <p className="text-slate-600 font-semibold text-2xl">تحميل...</p>
      ) : (
        <Card
          name={teacherData.name}
          role={teacherData.role}
          price={teacherData.price}
          id={teacherData._id}
          professional={teacherData.professional}
          multiple={false}
          avatar={teacherData.avatar}
          information={teacherData.information}
        />
      )}
    </div>
  );
};

export default Teacher;
