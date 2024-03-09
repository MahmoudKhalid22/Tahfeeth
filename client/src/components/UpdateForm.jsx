import React, { useState } from "react";
import styles from "./UpdateForm.module.css";

function UpdateForm({ userId, userToken }) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const updateUsername = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/user/update-username`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userToken,
          },
          body: JSON.stringify({
            name: username.trim().length > 0 ? username : null,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(await response.json());
      }

      const updatedData = await response.json();
      console.log(updatedData);

      const existingData = JSON.parse(localStorage.getItem("data"));
      existingData.user.name = updatedData.name;
      // existingData.user.email = updatedData[0].email;
      // existingData.user.password = updatedData[0].password;

      const updatedDataStr = JSON.stringify(existingData);
      localStorage.setItem("data", updatedDataStr);
      window.location.reload();
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${styles.container} mb-6 rounded-md border-2 border-[#43766C]`}
    >
      <form className="" onSubmit={updateUsername}>
        <div className="flex items-center justify-center gap-6 p-4 rounded-md">
          <input
            className="text-xl border-none outline-none rounded-md py-2 px-3 bg-[#58587b] text-[#ececec]"
            type="text"
            placeholder="الاسم"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit">تغيير</button>
        </div>
        <div>
          {loading && <p className="text-xl text-center">تحميل...</p>}
          {error && !loading && (
            <p className="text-xl text-center">حدث بعض الخطأ</p>
          )}
        </div>
      </form>
      <form className="flex items-center justify-center gap-6 p-4 rounded-md">
        <input
          className="text-xl border-none outline-none rounded-md py-2 px-3 bg-[#58587b] text-[#ececec]"
          type="text"
          placeholder="الايميل"
          // value={userDataUpdate.email}
          // onChange={(e) =>
          //   setUserDataUpdate({ ...userDataUpdate, email: e.target.value })
          // }
        />
        <button type="submit">تغيير</button>
      </form>
      <form className="flex items-center justify-center gap-6 p-4 rounded-md">
        <input
          className="text-xl border-none outline-none rounded-md py-2 px-3 bg-[#58587b] text-[#ececec]"
          type="password"
          placeholder="كلـــمة السر"
          // value={userDataUpdate.password}
          // onChange={(e) =>
          //   setUserDataUpdate({ ...userDataUpdate, password: e.target.value })
          // }
        />
        <button type="submit">تغيير</button>
      </form>
    </div>
  );
}

export default UpdateForm;
