import React, { useState } from "react";
import styles from "./AddUserForm.module.css";

function AddUserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const data = localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : undefined;

  const adminToken = data?.user.isAdmin ? data.token : undefined;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
      const response = await fetch("http://localhost:5000/users/", {
        method: "POST",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGZlZmQ0ZjQxNzA0ZTFiZGMyYmI2N2EiLCJpYXQiOjE2OTQ1OTM0MDR9.W6HsRkI_rzLt2rHiUjilwo9lR0SnKCSD53Xvslzc-v8",
        },
        body: JSON.stringify({
          name: name,
          password: password,
          email: email,
        }),
      });

    //   if (!response.ok) {
    //     const errorData = await response.json();
    //     throw new Error(errorData.error);
    //   }
      const returnedData = await response.json();
    //   console.log(returnedData);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="الاسم"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="الايميل"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="كلمة السر"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">تسجيل</button>
    </form>
  );
}

export default AddUserForm;
