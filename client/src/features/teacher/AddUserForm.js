import React, { useState } from "react";
import styles from "./AddUserForm.module.css";
import Cookies from "js-cookie";
import { useUser } from "../user/useUser";
import { useForm } from "react-hook-form";
import Error from "../../ui/utils/Error";
import { useAddTeacher, useAddStudent } from "../settings/useAddTeacher";
import { useGetTeachers } from "../settings/useGetTeachers";

function AddUserForm({ role, admin }) {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const [info, setInfo] = useState("");
  const [teacherId, setTeacherId] = useState("");

  const tokenA = Cookies.get("accessToken");

  const {
    isPending: isLoadingTeachers,
    data: teachers,
    error,
  } = useGetTeachers();

  let { data } = useUser(tokenA);
  data = data[0];

  const teacherToken = data?.role === "teacher" ? tokenA : null;
  const adminToken = data?.role === "admin" ? tokenA : null;
  const token = teacherToken ? teacherToken : adminToken;

  const {
    register,
    formState,
    handleSubmit: handleSubmitForm,
    reset,
  } = useForm();

  // TEACHER ADDS STUDENT
  const {
    isPending: isPendingAddStd,
    mutate: addStdData,
    error: addStdErr,
  } = useAddStudent();

  function submitNewStudent(data) {
    addStdData({
      name: data["name-2"],
      email: data["email-2"],
      password: data["pass-2"],
      age: data["age-2"],
      token: teacherToken,
    });
    reset();
  }

  // ADMIN ADDS TEACHER

  const { isPending, mutate: addTeacher } = useAddTeacher();

  function submitNewTeacher(data) {
    // console.log(data);
    addTeacher({
      name: data["name-2"],
      email: data["email-2"],
      password: data["pass-2"],
      age: data["age-2"],
      price: data["price-2"],
      professional: data["professional-state"],
      information: data["info-2"],
      token: adminToken,
    });

    reset();
  }
  // ADMIN ADDS STUDENT TO TEACHER

  const { isPending: isAddingStudent, mutate: addstudent } = useAddStudent();

  function submitNewStudentAdmin(data) {
    // console.log(data);
    addstudent({
      name: data["name-2"],
      email: data["email-2"],
      password: data["pass-2"],
      age: data["age-2"],
      teacherId: data["teacherId"],
      token: adminToken,
    });
  }

  return (
    <>
      <form
        className={`${styles.container} flex flex-col gap-6 w-fit py-4 px-6 rounded-md my-4 transition-all bg-[#9F8565]`}
        onSubmit={handleSubmitForm(
          admin && role === "teacher"
            ? submitNewTeacher
            : admin && role !== "teacher"
            ? submitNewStudentAdmin
            : submitNewStudent
        )}
      >
        <input
          className="text-[#ececec] text-xl border-none outline-none rounded-md py-2 px-3 bg-[#43766c]"
          type="text"
          placeholder="الاسم"
          id="name-2"
          {...register("name-2", {
            required:
              role === "teacher"
                ? "من فضلك أدخل اسم المعلم"
                : "من فضلك أدخل اسم الطالب",
          })}
        />
        {formState.errors["name-2"]?.message && (
          <Error type={"add"}>{formState.errors["name-2"].message}</Error>
        )}
        <input
          className="text-[#ececec] text-xl border-none outline-none rounded-md py-2 px-3 bg-[#43766c]"
          type="text"
          placeholder="الايميل"
          id="email-2"
          {...register("email-2", {
            required:
              role === "teacher"
                ? "من فضلك أدخل ايميل المعلم"
                : "من فضلك أدخل ايميل الطالب",
          })}
        />
        {formState.errors["email-2"]?.message && (
          <Error type={"add"}>{formState.errors["email-2"].message}</Error>
        )}{" "}
        <input
          className="text-[#ececec] text-xl border-none outline-none rounded-md py-2 px-3 bg-[#43766c]"
          type="password"
          placeholder="كلمة السر"
          id="pass-2"
          {...register("pass-2", {
            required:
              role === "teacher"
                ? "من فضلك أدخل كلمة سر المعلم"
                : "من فضلك أدخل كلمة سر الطالب",
          })}
        />
        {formState.errors["pass-2"]?.message && (
          <Error type={"add"}>{formState.errors["pass-2"].message}</Error>
        )}
        <input
          className="text-[#ececec] text-xl border-none outline-none rounded-md py-2 px-3 bg-[#43766c]"
          type="السن"
          placeholder={role === "teacher" ? "عمر المعلم" : "عمر الطالب"}
          {...register("age-2", {
            required:
              role === "teacher"
                ? "من فضلك أدخل عمر المعلم"
                : "من فضلك أدخل عمر الطالب",
          })}
        />
        {formState.errors["age-2"]?.message && (
          <Error type={"add"}>{formState.errors["age-2"].message}</Error>
        )}
        {admin && role === "student" && (
          <>
            <select
              className="cursor-pointer text-[#ececec] text-xl border-none outline-none rounded-md py-2 px-3 bg-[#43766c]"
              id="teacherId"
              {...register("teacherId", {
                required: "من فضلك حدد المعلم",
              })}
            >
              <option autoFocus>حدد المعلم</option>
              {teachers?.map((teacher) => (
                <option key={teacher?._id} value={teacher?._id}>
                  {teacher?.name}
                </option>
              ))}
            </select>
            {formState.errors["teacherId"]?.message && (
              <Error type={"add"}>
                {formState.errors["teacherId"].message}
              </Error>
            )}
          </>
        )}
        {admin && role === "teacher" && (
          <>
            <input
              className="text-[#ececec] text-xl border-none outline-none rounded-md py-2 px-3 bg-[#43766c]"
              type="text"
              placeholder="السعر بالشهر"
              id="price-2"
              {...register("price-2", {
                required: "من فضلك أدخل أجر شهر المعلم",
              })}
            />
            {formState.errors["price-2"]?.message && (
              <Error type={"add"}>{formState.errors["price-2"].message}</Error>
            )}
            <select
              id="professional-state"
              {...register("professional-state", {
                required: "من فضلك أدخل حالة إجازة المعلم",
              })}
            >
              <option autoFocus value={null}>
                حالة الإجازة
              </option>
              <option value={true}>نعم</option>
              <option value={false}>لا</option>
            </select>
            {formState.errors["professional-state"]?.message && (
              <Error type={"add"}>
                {formState.errors["professional-state"].message}
              </Error>
            )}

            <textarea
              className="text-[#ececec] text-xl border-none outline-none rounded-md h-32 py-2 px-3 bg-[#43766c]"
              type="information"
              placeholder="معلومات عن إدارة الحصة"
              id="info-2"
              {...register("info-2", {
                required: "من فضلك أدخل معلومات كيفية إدارة حصة المعلم",
              })}
            />
            {formState.errors["info-2"]?.message && (
              <Error type={"add"}>{formState.errors["info-2"].message}</Error>
            )}
          </>
        )}
        <button
          type="submit"
          className="p-2 border-none outline-none text-xl cursor-pointer rounded-md text-[#ececec] transition-colors text-center bg-[#7f6a51] hover:bg-[#5f503d] duration-300"
          disabled={isPendingAddStd}
        >
          {isPendingAddStd || isPending || isAddingStudent
            ? "تحميل..."
            : "تسجيل"}
        </button>
      </form>
      {info && <h4 className="text-2xl mt-6 text-[#9F8565]">{info.message}</h4>}
    </>
  );
}

export default AddUserForm;
