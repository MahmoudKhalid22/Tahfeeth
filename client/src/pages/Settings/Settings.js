import React, { useContext, useReducer, useState } from "react";
import UpdateForm from "../../features/auth/UpdateForm";
import AddUserForm from "../../features/teacher/AddUserForm";
import StudentCard from "../../features/teacher/StudentCard";
import { Link } from "react-router-dom";
import Spinner from "../../ui/utils/Spinner";
import Card from "../../features/teacher/Card";
import { AuthContext } from "../../utils/context";
import BadRequest from "../../ui/utils/BadRequest";
import { useUser } from "../../features/user/useUser";
import Cookies from "js-cookie";
import { useGetTeachers } from "../../features/settings/useGetTeachers";
import { useGetStudents } from "../../features/settings/useGetStudents";
import { useAddTeacher } from "../../features/settings/useAddTeacher";
import { useGetMessages } from "../../features/settings/useGetMessages";
import Error from "../../ui/utils/Error";
import MessageCard from "./MessageCard";

const initialState = {
  showTeacherForm: false,
  showStudentForm: false,
  stdShow: false,
  messages: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "showTeacher":
      return { ...state, showTeacherForm: !state.showTeacherForm };
    case "showStudent":
      return { ...state, showStudentForm: !state.showStudentForm };
    case "allTeachers":
      return { ...state, info: !state.info };
    case "displayStudents":
      return { ...state, stdShow: !state.stdShow };
    case "messages":
      return { ...state, messages: !state.messages };
    default:
      break;
  }
};

const Settings = () => {
  const [show, setShow] = useState(false);
  const [formUpdate, setFormUpdate] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialState);

  const { isLogin } = useContext(AuthContext);

  const token = Cookies.get("accessToken");

  // get user info
  let { isPending, data: userData, error: errorInfo } = useUser(token);
  userData = userData ? userData[0] : null;

  // get teacher info
  const {
    isPending: isPendingTeachers,
    data: teachers,
    error: errTeachers,
  } = useGetTeachers();

  // get students
  let teacherId;
  const isTeacher = userData?.role === "teacher";
  if (isTeacher) teacherId = userData?._id;
  const {
    isPending: isPendingStd,
    data: students,
    error: stdErr,
  } = useGetStudents(teacherId, token);

  const adminToken = userData?.role === "admin" ? token : null;
  const teacherToken = userData?.role === "teacher" ? token : null;

  // ADD TEACHER

  const { isPending: isAddingTeacher, mutate } = useAddTeacher();

  // ADD STUDENT TO TEACHER

  // GET MESSAGES FOR ADMIN
  const {
    isPending: isLoadingMessages,
    data: messages,
    error: msgError,
  } = useGetMessages(adminToken);

  console.log(messages);

  if (!isLogin) {
    return <BadRequest />;
  }
  return (
    <div className="md:w-[80%] w-full mr-4 mb-[11.5rem] md:mb-0 mt-16">
      {/* ADMIN DASHBOARD */}
      {isPending && <Spinner />}
      {userData?.role === "admin" && (
        <div className="text-2xl ">
          <div className="flex flex-col gap-6">
            <div>
              <button
                className="bg-[#43766C] hover:bg-[#365e56] transition-colors duration-300 text-white px-4 py-2 text-lg"
                onClick={() => {
                  dispatch({ type: "allTeachers" });
                }}
              >
                عرض كل المعلمين
              </button>
              {errTeachers ? (
                <p className="text-red-600 font-semibold text-2xl mt-6">
                  حدث بعض الخطأ
                </p>
              ) : isPendingTeachers ? (
                <div className="w-16 mt-4">
                  <Spinner />
                </div>
              ) : (
                state.info && (
                  <div className="flex gap-6 flex-wrap mt-4 md:justify-start justify-center">
                    {teachers?.map((user) => (
                      <Card
                        key={user?._id}
                        name={user?.name}
                        role={user?.role}
                        professional={user?.professional}
                        price={user?.price}
                        admin={true}
                        id={user?._id}
                        adminToken={adminToken}
                        avatar={user?.avatar}
                      />
                    ))}
                  </div>
                )
              )}
            </div>
            <div>
              <button
                className="bg-[#43766C] hover:bg-[#365e56] transition-colors duration-300 text-white px-4 py-2 text-lg"
                onClick={() => {
                  dispatch({ type: "messages" });
                }}
              >
                عرض الرسائل
              </button>
              {state.messages &&
                (isLoadingMessages ? (
                  <Spinner />
                ) : msgError ? (
                  <Error>حدث بعض الخطأ</Error>
                ) : (
                  <div className="flex items-center flex-wrap">
                    {messages?.map((message) => (
                      <MessageCard
                        key={message?._id}
                        name={message?.name}
                        email={message?.email}
                        msg={message?.msg}
                      />
                    ))}
                  </div>
                ))}
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

      {userData?.role === "teacher" && (
        <div>
          <div>
            <div>
              <button
                className="bg-[#43766C] hover:bg-[#365e56] transition-colors duration-300 text-white px-4 py-2 text-lg"
                onClick={() => dispatch({ type: "displayStudents" })}
              >
                عرض كل الطلبة
              </button>
              {state.stdShow && (
                <div className="flex gap-2 w-full flex-wrap ">
                  {isPendingStd ? (
                    <p className="text-xl font-semibold">تحميل...</p>
                  ) : stdErr ? (
                    <p className="text-red-600 text-xl font-semibold">
                      حدث بعض الخطأ الداخلي.
                    </p>
                  ) : (
                    students?.length > 0 &&
                    students?.map((student) => (
                      <StudentCard
                        key={student._id}
                        student={student}
                        teacherToken={teacherToken}
                      />
                    ))
                  )}
                </div>
              )}
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
            // getData();
          }}
        >
          معلومات الحساب
        </button>
        {show && (
          <div>
            {isPending ? (
              <Spinner />
            ) : errorInfo ? (
              <p>حدث بعض الخطأ</p>
            ) : userData ? (
              <div
                key={userData?._id}
                className="flex flex-col gap-4 border-2 border-[#43655c] py-4 px-6 w-fit justify-end items-start mt-6"
              >
                <div className="flex flex-row-reverse gap-8">
                  <p id="email">{userData?.email}</p>
                  <label>البريد الإلكتروني</label>
                </div>
                <div className="flex flex-row-reverse gap-8">
                  <p id="email">{userData?.name}</p>
                  <label>الاسم</label>
                </div>
                <div className="flex flex-row-reverse gap-8">
                  <p id="email">
                    {userData?.role === "teacher"
                      ? "معلم"
                      : userData?.role === "student"
                      ? "طالب"
                      : "مدير"}
                  </p>
                  <label>الدور</label>
                </div>
                <div className="flex flex-row-reverse gap-8">
                  <p id="email">
                    {userData?.status === "pending"
                      ? "في الانتظار"
                      : userData?.status === "block"
                      ? "محظور"
                      : "نشط"}
                  </p>
                  <label>حالة القبول</label>
                </div>
                <div className="flex flex-row-reverse gap-8">
                  <p id="email">
                    {userData?.professional ? "مجاز" : "غير مجاز"}
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
          {formUpdate && <UpdateForm userId={userData._id} userToken={token} />}
        </div>
      </div>
    </div>
  );
};

export default Settings;
