import React, { useEffect, useState } from "react";
import UpdateForm from "../components/UpdateForm";
import Student from "./Student";

const data = JSON.parse(localStorage.getItem("data"));

const Settings = () => {
  const [show, setShow] = useState(false);
  const [formUpdate, setFormUpdate] = useState(false);

  if (!data) return <p>يجب تسجيل الدخول</p>;
  return (
    <div className="w-[80%] mr-24 lg:mr-96 mt-16">
      <div>
        <button
          className="bg-[#43766C] hover:bg-[#365e56] transition-colors duration-300 text-white px-4 py-2 text-lg rounded-xl"
          onClick={() => setShow(!show)}
        >
          معلومات الحساب
        </button>

        {show && data && (
          <div
            key={data._id}
            className="flex flex-col gap-4 border-2 border-[#43655c] py-4 px-6 w-fit justify-end items-start mt-6"
          >
            <div className="flex flex-row-reverse gap-8">
              <p id="email">{data.user.email}</p>
              <label>البريد الإلكتروني</label>
            </div>
            <div className="flex flex-row-reverse gap-8">
              <p id="email">{data.user.name}</p>
              <label>الاسم</label>
            </div>
            <div className="flex flex-row-reverse gap-8">
              <p id="email">
                {data.user.role === "teacher"
                  ? "معلم"
                  : data.user.role === "student"
                  ? "طالب"
                  : "مدير"}
              </p>
              <label>الدور</label>
            </div>
            <div className="flex flex-row-reverse gap-8">
              <p id="email">
                {data.user.status === "pending"
                  ? "في الانتظار"
                  : data.status === "block"
                  ? "محظور"
                  : "نشط"}
              </p>
              <label>حالة القبول</label>
            </div>
            <div className="flex flex-row-reverse gap-8">
              <p id="email">{data.user.professional ? "مجاز" : "غير مجاز"}</p>
              <label>حالة الإجازة</label>
            </div>

            <div></div>
          </div>
        )}
      </div>
      <div>
        <button
          className="text-center text-lg p-2 border-none outline-none cursor-pointer rounded-lg bg-[#959689] text-white transition-colors mt-12 flex items-center justify-center hover:bg-[#959689]"
          onClick={() => setFormUpdate((prev) => !prev)}
          title="تحديث المعلومات الشخصية"
        >
          تحديث معلومات الحساب
        </button>
        <div className="mt-6 w-fit border-none">
          {formUpdate && (
            <UpdateForm userId={data?.user._id} userToken={data?.accessToken} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
