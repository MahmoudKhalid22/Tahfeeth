import React, { useReducer, useState } from "react";
import UpdateForm from "../components/UpdateForm";
import AddUserForm from "../components/AddUserForm";
import StudentCard from "../components/StudentCard";
import { Link } from "react-router-dom";
import Spinner from "../components/utilsComponents/Spinner";
import Card from "../components/Teacher/Card";

const data = JSON.parse(localStorage.getItem("data"));

const adminToken = data?.user?.role === "admin" ? data.accessToken : null;
const teacherToken = data?.user?.role === "teacher" ? data.accessToken : null;
// const studentToken = data?.user?.role === "student" ? data.accessToken : null;

const initialState = {
  showTeacherForm: false,
  showStudentForm: false,
  info: false,
  loading: false,
  teachers: [],
  students: [],
};
const reducer = (state, action) => {
  switch (action.type) {
    case "showTeacher":
      return { ...state, showTeacherForm: !state.showTeacherForm };
    case "showStudent":
      return { ...state, showStudentForm: !state.showStudentForm };
    case "allTeachers":
      return { ...state, info: !state.info };
    case "dataLoading":
      return { ...state, loading: true };
    case "teachers":
      return { ...state, teachers: action.payload };
    case "students":
      return { ...state, students: action.payload };
    default:
      break;
  }
};

const Settings = () => {
  const [show, setShow] = useState(false);
  const [formUpdate, setFormUpdate] = useState(false);
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialState);
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
  const getTeachers = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://tahfeeth-system.onrender.com/user/admin/teachers",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + adminToken,
          },
        }
      );
      const result = await response.json();
      dispatch({ type: "teachers", payload: result });
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  const getStudents = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://tahfeeth-system.onrender.com/user/students",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + teacherToken,
          },
        }
      );
      const students = await response.json();
      dispatch({ type: "students", payload: students?.students });
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (!data || data.length === 0) {
    return (
      <div className="overflow-hidden h-screen w-[80%] absolute left-0 flex flex-col items-center justify-center">
        <h2 className="text-red-700 text-3xl font-semibold text-center overflow-y-hidden">
          يجب تسجيل الدخول
        </h2>
        <Link
          to="/register?mode=login"
          className="text-white bg-[#959689] text-3xl font-semibold text-center mx-auto block mt-12 w-fit p-4 rounded-lg hover:bg-[#67685e] transition-colors"
        >
          تسجيل الدخول
        </Link>
      </div>
    );
  }
  return (
    <div className="w-[80%] mr-20 lg:mr-80 mt-16">
      {/* ADMIN DASHBOARD */}
      {data?.user?.role === "admin" && (
        <div className="text-2xl ">
          <div className="flex flex-col gap-6">
            <div>
              <button
                className="bg-[#43766C] hover:bg-[#365e56] transition-colors duration-300 text-white px-4 py-2 text-lg"
                onClick={() => {
                  getTeachers();
                  dispatch({ type: "allTeachers" });
                }}
              >
                عرض كل المعلمين
              </button>
              {error ? (
                <p className="text-red-600 font-semibold text-2xl mt-6">
                  حدث بعض الخطأ
                </p>
              ) : loading ? (
                <div className="w-16 mt-4">
                  <Spinner />
                </div>
              ) : (
                state.info && (
                  <div className="flex gap-6 flex-wrap mt-4">
                    {state.teachers?.map((user) => (
                      <Card
                        key={user?._id}
                        name={user?.name}
                        role={user?.role}
                        professional={user?.professional}
                        avatar={user?.avatar}
                        price={user?.price}
                        admin={true}
                        id={user?._id}
                        adminToken={adminToken}
                      />
                    ))}
                  </div>
                )
              )}
            </div>
            <div>
              <button
                className="bg-[#43766C] hover:bg-[#365e56] transition-colors duration-300 text-white px-4 py-2 text-lg"
                onClick={() => dispatch({ type: "showTeacher" })}
              >
                إضافة معلم
              </button>

              {state.showTeacherForm && (
                <AddUserForm admin={true} role="teacher" />
              )}
            </div>
            <div>
              <button
                className="bg-[#43766C] hover:bg-[#365e56] transition-colors duration-300 text-white px-4 py-2 text-lg "
                onClick={() => dispatch({ type: "showStudent" })}
              >
                إضافة طالب
              </button>
              {state.showStudentForm && (
                <AddUserForm
                  role="student"
                  admin={true}
                  teachers={state.teachers}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {data?.user?.role === "teacher" && (
        <div>
          <div>
            <div>
              <button
                className="bg-[#43766C] hover:bg-[#365e56] transition-colors duration-300 text-white px-4 py-2 text-lg"
                onClick={() => {
                  getStudents();
                }}
              >
                عرض كل الطلبة
              </button>
              <div className="flex gap-2 w-full flex-wrap ">
                {loading ? (
                  <p className="text-xl font-semibold">تحميل...</p>
                ) : error ? (
                  <p className="text-red-600 text-xl font-semibold">
                    حدث بعض الخطأ الداخلي.{" "}
                  </p>
                ) : (
                  state.students.length > 0 &&
                  state.students.map((student) => (
                    <StudentCard
                      key={student._id}
                      student={student}
                      teacherToken={teacherToken}
                    />
                  ))
                )}
              </div>
            </div>
            <div>
              <button
                className="bg-[#43766C] hover:bg-[#365e56] transition-colors duration-300 text-white px-4 py-2 text-lg mt-6"
                onClick={() => dispatch({ type: "showStudent" })}
              >
                إضافة طالب
              </button>
              {state?.showStudentForm && <AddUserForm role="student" />}
            </div>
          </div>
        </div>
      )}

      <div className="mt-6">
        <button
          className="bg-[#43766C] hover:bg-[#365e56] transition-colors duration-300 text-white px-4 py-2 text-lg"
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
        <Link
          to="/settings/edit"
          className="text-center w-fit text-lg p-2 border-none outline-none cursor-pointer  bg-[#43766C] hover:bg-[#365e56] text-white transition-colors mt-6 flex items-center justify-center "
          onClick={() => setFormUpdate((prev) => !prev)}
          title="تحديث المعلومات الشخصية"
        >
          تحديث معلومات الحساب
        </Link>
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
