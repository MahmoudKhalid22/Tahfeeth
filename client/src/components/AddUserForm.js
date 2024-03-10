import React, { useState } from "react";
import styles from "./AddUserForm.module.css";

function AddUserForm({ role }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [info, setInfo] = useState(false);

  const data = localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : null;

  const teacherToken = data?.user.role === "teacher" ? data.accessToken : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://tahfeeth-system.onrender.com/user/teacher/signup",
        {
          method: "POST",
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            role: "student",
            status: "verified",
            verified: true,
          }),
          headers: {
            "Content-Type": "application/json",

            Authorization: "Bearer " + teacherToken,
          },
        }
      );
      console.log(await response.json());

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      setName("");
      setEmail("");
      setPassword("");

      setInfo(true);
      setTimeout(() => setInfo(false), 1000);
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
        <button
          type="submit"
          className="p-2 border-none outline-none text-xl cursor-pointer rounded-md text-[#ececec] transition-colors text-center bg-[#7f6a51] hover:bg-[#5f503d] duration-300"
        >
          تسجيل
        </button>
      </form>
      {info && (
        <h4 className="text-5xl text-center mt-10 text-[#9F8565]">
          تمت إضافة الطالب
        </h4>
      )}
    </>
  );
}

export default AddUserForm;
