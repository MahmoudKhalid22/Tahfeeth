import React, { useEffect, useState } from "react";
import UpdateForm from "../components/UpdateForm";
import Student from "./Student";

const data = JSON.parse(localStorage.getItem("data"));
console.log(data);

const Settings = () => {
  const [show, setShow] = useState(false);
  const [formUpdate, setFormUpdate] = useState(false);
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://tahfeeth-system.onrender.com/user/me",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + data?.accessToken,
          },
        }
      );
      const result = await response.json();
      setUserData(result);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (!data) return <p>يجب تسجيل الدخول</p>;
  return (
    <div className="w-[80%] mr-24 lg:mr-96 mt-16">
      <div>
        <button
          className="bg-[#43766C] hover:bg-[#365e56] transition-colors duration-300 text-white px-4 py-2 text-lg rounded-xl"
          onClick={() => {
            setShow(!show);
            getData();
          }}
        >
          معلومات الحساب
        </button>
        {show && (
          <div>
            {loading ? (
              <p className="text-2xl">loading...</p>
            ) : error ? (
              <p>حدث بعض الخطأ</p>
            ) : userData ? (
              <div
                key={userData[0]?._id}
                className="flex flex-col gap-4 border-2 border-[#43655c] py-4 px-6 w-fit justify-end items-start mt-6"
              >
                <div className="flex flex-row-reverse gap-8">
                  <p id="email">{userData[0]?.email}</p>
                  <label>البريد الإلكتروني</label>
                </div>
                <div className="flex flex-row-reverse gap-8">
                  <p id="email">{userData[0]?.name}</p>
                  <label>الاسم</label>
                </div>
                <div className="flex flex-row-reverse gap-8">
                  <p id="email">
                    {userData[0]?.role === "teacher"
                      ? "معلم"
                      : userData[0]?.role === "student"
                      ? "طالب"
                      : "مدير"}
                  </p>
                  <label>الدور</label>
                </div>
                <div className="flex flex-row-reverse gap-8">
                  <p id="email">
                    {userData[0]?.status === "pending"
                      ? "في الانتظار"
                      : userData[0]?.status === "block"
                      ? "محظور"
                      : "نشط"}
                  </p>
                  <label>حالة القبول</label>
                </div>
                <div className="flex flex-row-reverse gap-8">
                  <p id="email">
                    {userData[0]?.professional ? "مجاز" : "غير مجاز"}
                  </p>
                  <label>حالة الإجازة</label>
                </div>

                <div></div>
              </div>
            ) : (
              <p>تحميل...</p>
            )}
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
