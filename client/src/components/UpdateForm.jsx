import React, { useState } from "react";
import styles from "./UpdateForm.module.css";

function UpdateForm({ userId, userToken }) {
  const [userDataUpdate, setUserDataUpdate] = useState({
    name: "",
    email: "",
    password: "",
  });

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://tahfeeth-system.onrender.com/users/${userId}`,
        {
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
        }
      );

      if (!response.ok) {
        console.log(response.error);
        throw new Error();
      }

      const updatedData = await response.json();
      console.log(updatedData[0]);
      setUserDataUpdate({
        ...userDataUpdate,
        name: "",
        email: "",
        password: "",
      });
      const existingData = localStorage.getItem("data");
      const existingDataParsed = JSON.parse(existingData);

      existingDataParsed.user.name = updatedData[0].name;
      existingDataParsed.user.email = updatedData[0].email;
      existingDataParsed.user.password = updatedData[0].password;

      const updatedDataStr = JSON.stringify(existingDataParsed);
      console.log(updatedDataStr);
      localStorage.setItem("data", updatedDataStr);
      window.location.reload();
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  };

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
