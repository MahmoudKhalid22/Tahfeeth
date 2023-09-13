import React, { useState } from "react";
import styles from "./UpdateForm.module.css";

function UpdateForm({ userId, userToken }) {
  const [userDataUpdate, setUserDataUpdate] = useState({
    name: undefined,
    email: undefined,
    password: undefined,
  });
  // console.log(userToken);
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
          name: userDataUpdate.name,
          email: userDataUpdate.email,
          password: userDataUpdate.password,
        }),
        headers: {
          Authorization: "Bearer " + userToken,
        },
      });

      if (!response.ok) {
        console.log(response.error);
        throw new Error();
      }
      console.log(await response.json());

      // window.location.reload();
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
        onChange={(e) =>
          setUserDataUpdate({ ...userDataUpdate, name: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="الايميل"
        onChange={(e) =>
          setUserDataUpdate({ ...userDataUpdate, email: e.target.value })
        }
      />
      <input
        type="password"
        placeholder="كلـــمة السر"
        onChange={(e) =>
          setUserDataUpdate({ ...userDataUpdate, password: e.target.value })
        }
      />
      <button type="submit">تعديل</button>
    </form>
  );
}

export default UpdateForm;
