import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiEntryDoor } from "react-icons/gi";
import { RxUpdate } from "react-icons/rx";
import styles from "./Details.module.css";
import AddUserForm from "./AddUserForm";

import UpdateForm from "./UpdateForm";
import Student from "../pages/Student";

function Details({ onSetIsLogin }) {
  const navigate = useNavigate();

  const [userShow, setUserShow] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [formUpdate, setFormUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const data = localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : null;

  if (!data) {
    return (
      <div className="overflow-hidden h-[35rem] w-[80%] flex flex-col">
        <h2 className="text-red-700 text-3xl font-semibold text-center w-[100%] mx-auto translate-y-1/2 h-full overflow-y-hidden -left-[12%] absolute">
          يجب تسجيل الدخول
        </h2>
        <Link
          to="/register?mode=login"
          className="text-white bg-[#959689] text-3xl font-semibold text-center mx-auto translate-y-1/2 block mt-12 w-fit p-4 rounded-lg hover:bg-[#67685e] transition-colors -left-[12%] absolute"
        >
          تسجيل الدخول
        </Link>
      </div>
    );
  }

  const stdToken = data?.accessToken;
  const teacherToken = data?.user.role === "teacher" ? data.accessToken : null;
  const adminToken = data?.user.role === "admin" ? data.accessToken : null;

  // console.log(data);

  // const adminToken = data?.user.isAdmin ? data.token : undefined;
  // console.log(data.token);
  const logout = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/user/logout", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + data.accessToken,
        },
      });
      setLoading(false);
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error(errorData.error);
      }
      localStorage.clear();
      onSetIsLogin(false);
      return navigate("/");
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // const getUsers = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await fetch(
  //       "https://tahfeeth-system.onrender.com/users",
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: "Bearer " + adminToken,
  //         },
  //       }
  //     );
  //     const d = await response.json();
  //     setUsersData(d);
  //     setLoading(false);
  //   } catch (err) {
  //     throw new Error(err);
  //   }
  // };

  // const deleteUser = async (id) => {
  //   try {
  //     setLoading(true);

  //     await fetch("https://tahfeeth-system.onrender.com/users/" + id, {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: "Bearer " + adminToken,
  //       },
  //     });
  //     setLoading(false);

  //     window.location.reload();
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // };

  return (
    <div className={`${styles.container} mt-6  mr-16 lg:mr-[16rem]`}>
      <div className="flex items-center justify-center gap-8 mb-12 text-[#43766C] text-lg md:text-4xl font-semibold">
        <h3>الاسم</h3>

        {data && (
          <h4 className="flex items-center justify-center gap-2">
            {data.user.name}
            {data.user.role === "student"
              ? "(طالب) "
              : data.user.role === "teacher"
              ? "(معلم) "
              : "(مدير) "}
          </h4>
        )}
      </div>
      <div className={styles.settings}>
        <button
          className="text-center text-5xl p-2 border-none outline-none cursor-pointer rounded-lg bg-[#959689] text-white transition-colors flex items-center justify-center hover:bg-[#959689]"
          onClick={logout}
          title="تسجيل الخروج"
        >
          <GiEntryDoor />
        </button>
        <button
          className="text-center text-5xl p-2 border-none outline-none cursor-pointer rounded-lg bg-[#959689] text-white transition-colors flex items-center justify-center hover:bg-[#959689]"
          onClick={() => setFormUpdate((prev) => !prev)}
          title="تحديث المعلومات الشخصية"
        >
          <RxUpdate />
        </button>
      </div>
      {error && !loading && (
        <p className="text-center my-12 text-red-600 font-semibold text-2xl">
          لا يمكن تسجيل الخروج يوجد خطأ داخلي في السيرفر
        </p>
      )}
      {loading && <h4 className="loading loading-details">تحميل ...</h4>}

      <div
        className={`${styles.updateForm} ${formUpdate ? styles.active : ""}`}
      >
        {formUpdate && (
          <UpdateForm userId={data?.user._id} userToken={data?.accessToken} />
        )}
      </div>
      {data?.user.role !== "teacher" && <Student />}
      <div>
        {data?.user.role === "teacher" ? (
          <div className="flex items-center flex-wrap justify-center gap-4">
            <button
              onClick={() => {
                setUserShow(true);
              }}
            >
              إضافة طالب
            </button>
            <button>قراءة بيانات الطلاب</button>
          </div>
        ) : undefined}

        {/* <div
          className={`${styles.updateForm} ${userShow ? styles.addForm : ""}`}
        >
          {/* <AddUserForm /> */}
        {/* </div> */}
        {!userShow &&
          !loading &&
          usersData?.map((user) => (
            <div className={styles.cart} key={user._id}>
              <div className={styles["student-info"]}>
                <span>الاسم / </span>
                <span>{user.name}</span>
              </div>
              <div className={styles["student-info"]}>
                <span>الايميل / </span>
                <span>{user.email}</span>
              </div>

              <div className={styles["action-buttons"]}>
                <button
                  className={styles["action-button-delete"]}
                  // onClick={() => deleteUser(user._id)}
                >
                  حذف الطالب
                </button>
                <button className={styles["action-button-data"]}>
                  <Link to={`/details/${user._id}`}>بيانات الطالب</Link>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Details;
