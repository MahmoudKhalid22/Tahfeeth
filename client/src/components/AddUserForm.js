import React, { useState } from "react";
import styles from "./AddUserForm.module.css";

function AddUserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [info, setInfo] = useState(false);

  const data = localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : undefined;

  const adminToken = data?.user.isAdmin ? data.token : undefined;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/users/", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          password: password,
          email: email,
        }),
        headers: {
          "Content-Type": "application/json",

          Authorization: "Bearer " + adminToken,
        },
      });

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
      <form className={styles.container} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="الاسم"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="الايميل"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="كلمة السر"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">تسجيل</button>
      </form>
      {info && <h4 className={styles.added}>تمت إضافة الطالب</h4>}
    </>
  );
}

export default AddUserForm;
