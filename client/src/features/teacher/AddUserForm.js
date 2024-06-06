import React, { useState } from "react";
import styles from "./AddUserForm.module.css";
import Cookies from "js-cookie";
import { useUser } from "../user/useUser";
import { useAddStudent } from "./useAddStudent";
import { useForm } from "react-hook-form";
import Error from "../../ui/utils/Error";

function AddUserForm({ role, admin, teachers }) {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [info, setInfo] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [age, setAge] = useState(null);

  // FOR TEACHER
  const [price, setPrice] = useState(null);
  const [professional, setProfessional] = useState(false);
  const [information, setInformation] = useState("");

  const tokenA = Cookies.get("accessToken");

  let { data } = useUser(tokenA);
  data = data[0];

  const teacherToken = data?.role === "teacher" ? tokenA : null;
  const adminToken = data?.role === "admin" ? tokenA : null;
  const token = teacherToken ? teacherToken : adminToken;

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch(
  //       "https://tahfeeth-system.onrender.com/user/teacher/signup",
  //       {
  //         method: "POST",
  //         body: JSON.stringify({
  //           name: name,
  //           email: email,
  //           password: password,
  //           age: age,
  //           status: "verified",
  //           verified: true,
  //           role: admin ? role : "student",
  //           price: admin ? (role === "teacher" ? price : null) : null,
  //           professional: admin
  //             ? role === "teacher"
  //               ? professional
  //               : null
  //             : null,
  //           information: admin
  //             ? role === "teacher"
  //               ? information
  //               : null
  //             : null,

  //           id: admin ? (role === "student" ? teacherId : null) : null,
  //         }),
  //         headers: {
  //           "Content-Type": "application/json",

  //           Authorization: "Bearer " + token,
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       console.log(errorData);
  //       throw new Error(errorData.error);
  //     }
  //     setName("");
  //     setEmail("");
  //     setPassword("");

  //     setInfo(await response.json());
  //     setTimeout(() => setInfo(false), 2000);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const { register, formState, handleSubmit: handleSubmitForm } = useForm();

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
  }

  return (
    <>
      <form
        className={`${styles.container} flex flex-col gap-6 w-fit py-4 px-6 rounded-md my-4 transition-all bg-[#9F8565]`}
        onSubmit={handleSubmitForm(submitNewStudent)}
      >
        <input
          className="text-[#ececec] text-xl border-none outline-none rounded-md py-2 px-3 bg-[#43766c]"
          type="text"
          placeholder="الاسم"
          id="name-2"
          {...register("name-2", {
            required: "من فضلك أدخل اسم الطالب",
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
            required: "من فضلك أدخل ايميل الطالب",
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
            required: "من فضلك أدخل كلمة سر الطالب",
          })}
        />
        {formState.errors["pass-2"]?.message && (
          <Error type={"add"}>{formState.errors["pass-2"].message}</Error>
        )}
        <input
          className="text-[#ececec] text-xl border-none outline-none rounded-md py-2 px-3 bg-[#43766c]"
          type="السن"
          placeholder="عمر الطالب"
          {...register("age-2", {
            required: "من فضلك أدخل عمر الطالب",
          })}
        />
        {formState.errors["age-2"]?.message && (
          <Error type={"add"}>{formState.errors["age-2"].message}</Error>
        )}
        {admin && role === "student" && (
          <select
            className="cursor-pointer text-[#ececec] text-xl border-none outline-none rounded-md py-2 px-3 bg-[#43766c]"
            onChange={(e) => setTeacherId(e.target.value)}
          >
            <option autoFocus>حدد المعلم</option>
            {teachers?.map((teacher) => (
              <option key={teacher?._id} value={teacher?._id}>
                {teacher?.name}
              </option>
            ))}
          </select>
        )}
        {admin && role === "teacher" && (
          <>
            <input
              className="text-[#ececec] text-xl border-none outline-none rounded-md py-2 px-3 bg-[#43766c]"
              type="text"
              placeholder="السعر بالشهر"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <select onChange={(e) => setProfessional(e.target.value)}>
              <option autoFocus>حالة الإجازة</option>
              <option value={true}>نعم</option>
              <option value={false}>لا</option>
            </select>

            <textarea
              className="text-[#ececec] text-xl border-none outline-none rounded-md h-32 py-2 px-3 bg-[#43766c]"
              type="information"
              placeholder="معلومات عن إدارة الحصة"
              value={information}
              onChange={(e) => setInformation(e.target.value)}
            />
          </>
        )}
        <button
          type="submit"
          className="p-2 border-none outline-none text-xl cursor-pointer rounded-md text-[#ececec] transition-colors text-center bg-[#7f6a51] hover:bg-[#5f503d] duration-300"
          disabled={isPendingAddStd}
        >
          {isPendingAddStd ? "تحميل..." : "تسجيل"}
        </button>
      </form>
      {info && <h4 className="text-2xl mt-6 text-[#9F8565]">{info.message}</h4>}
    </>
  );
}

export default AddUserForm;
