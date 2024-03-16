import React, { useState } from "react";
import styles from "./AddUserForm.module.css";

function AddUserForm({ role, admin, teachers }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [info, setInfo] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [age, setAge] = useState(null);

  // FOR TEACHER
  const [price, setPrice] = useState(null);
  const [professional, setProfessional] = useState(false);
  const [information, setInformation] = useState("");

  const data = localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : null;

  const teacherToken = data?.user.role === "teacher" ? data.accessToken : null;
  const adminToken = data?.user?.role === "admin" ? data?.accessToken : null;
  const token = teacherToken ? teacherToken : adminToken;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/user/teacher/signup",
        {
          method: "POST",
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            age: age,
            status: "verified",
            verified: true,
            role: admin ? role : "student",
            price: admin ? (role === "teacher" ? price : null) : null,
            professional: admin
              ? role === "teacher"
                ? professional
                : null
              : null,
            information: admin
              ? role === "teacher"
                ? information
                : null
              : null,

            id: admin ? (role === "student" ? teacherId : null) : null,
          }),
          headers: {
            "Content-Type": "application/json",

            Authorization: "Bearer " + token,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error(errorData.error);
      }
      setName("");
      setEmail("");
      setPassword("");

      setInfo(await response.json());
      setTimeout(() => setInfo(false), 2000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form
        className={`${styles.container} flex flex-col gap-6 w-fit py-4 px-6 rounded-md my-4 transition-all bg-[#9F8565]`}
        onSubmit={handleSubmit}
      >
        <input
          className="text-[#ececec] text-xl border-none outline-none rounded-md py-2 px-3 bg-[#43766c]"
          type="text"
          placeholder="الاسم"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="text-[#ececec] text-xl border-none outline-none rounded-md py-2 px-3 bg-[#43766c]"
          type="text"
          placeholder="الايميل"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="text-[#ececec] text-xl border-none outline-none rounded-md py-2 px-3 bg-[#43766c]"
          type="password"
          placeholder="كلمة السر"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="text-[#ececec] text-xl border-none outline-none rounded-md py-2 px-3 bg-[#43766c]"
          type="السن"
          placeholder="كم عمرك"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
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
        >
          تسجيل
        </button>
      </form>
      {info && <h4 className="text-2xl mt-6 text-[#9F8565]">{info.message}</h4>}
    </>
  );
}

export default AddUserForm;
