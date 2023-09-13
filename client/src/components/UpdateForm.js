import React, { useState } from "react";
import styles from "./UpdateForm.module.css";

function UpdateForm({ userId, userToken }) {
  const [userDataUpdate, setUserDataUpdate] = useState({
    name: undefined,
    email: undefined,
    password: undefined,
  });

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      console.log(
        JSON.stringify({
          name: userDataUpdate.name,
          email: userDataUpdate.email,
          password: userDataUpdate.password,
        })
      );
      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: "PATCH",
        body: JSON.stringify({
          name:
            userDataUpdate.name.trim().length > 0
              ? userDataUpdate.name
              : undefined,
          email:
            userDataUpdate.email.trim().length > 0
              ? userDataUpdate.email
              : undefined,
          password:
            userDataUpdate.password.trim().length > 0
              ? userDataUpdate.password
              : undefined,
        }),
        headers: {
          "Content-Type": "application/json",

          Authorization: "Bearer " + userToken,
        },
      });

      if (!response.ok) {
        console.log(response.error);
        throw new Error();
      }
      // console.log(await response.json());
      const updatedData = await response.json();
      console.log(updatedData);
      setUserDataUpdate({
        ...userDataUpdate,
        name: "",
        email: "",
        password: "",
      });
      // window.location.reload();
      const json = JSON.parse(localStorage.getItem("data"));
      json.user.name = updatedData.name;
      json.user.email = updatedData.email;
      json.user.password = updatedData.password;
      
      // console.log(localStorage.getItem("data").user);
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  };
  console.log(JSON.parse(localStorage.getItem("data")).user);

  return (
    <form className={styles.container} onSubmit={updateUser}>
      <input
        type="text"
        placeholder="الاسم"
        value={userDataUpdate.name}
        onChange={(e) =>
          setUserDataUpdate({ ...userDataUpdate, name: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="الايميل"
        value={userDataUpdate.email}
        onChange={(e) =>
          setUserDataUpdate({ ...userDataUpdate, email: e.target.value })
        }
      />
      <input
        type="password"
        placeholder="كلـــمة السر"
        value={userDataUpdate.password}
        onChange={(e) =>
          setUserDataUpdate({ ...userDataUpdate, password: e.target.value })
        }
      />
      <button type="submit">تعديل</button>
    </form>
  );
}

export default UpdateForm;
