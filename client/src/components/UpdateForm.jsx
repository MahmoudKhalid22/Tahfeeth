import React, { useEffect, useState } from "react";
import styles from "./UpdateForm.module.css";

function UpdateForm({ userId, userToken }) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const updateUsername = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        `https://tahfeeth-system.onrender.com/user/update-username`,
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

  const uploadAvatar = async (e) => {
    e.preventDefault();
    try {
      console.log(avatar);
      const formData = new FormData();
      formData.append("avatar", avatar);

      const response = await fetch(
        "https://tahfeeth-system.onrender.com/user/upload-avatar",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + userToken,
          },
        }
      );
      if (!response.ok) {
        console.log(await response.json());
        throw new Error();
      }

      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div
      className={`${styles.container} mb-6 rounded-md border-2 border-[#43766C]`}
    >
      <form className="" onSubmit={updateUsername}>
        <div className="flex items-center sm:justify-center gap-2 sm:gap-6 p-4 rounded-md">
          <input
            className="text-md sm:w-auto w-[55%] sm:text-xl border-none outline-none rounded-md py-2 px-3 bg-[#58587b] text-[#ececec]"
            type="text"
            placeholder="الاسم"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit">تغيير</button>
        </div>
        <div>
          {loading && (
            <p className="text-md sm:text-xl text-center">تحميل...</p>
          )}
          {error && !loading && (
            <p className="text-md sm:text-xl text-center">حدث بعض الخطأ</p>
          )}
        </div>
      </form>
      <form className="flex items-center sm:justify-center gap-2 sm:gap-6 p-4 rounded-md">
        <input
          className="sm:w-auto w-[55%] text-md sm:text-xl border-none outline-none rounded-md py-2 px-3 bg-[#58587b] text-[#ececec]"
          type="text"
          placeholder="الايميل"
          // value={userDataUpdate.email}
          // onChange={(e) =>
          //   setUserDataUpdate({ ...userDataUpdate, email: e.target.value })
          // }
        />
        <button type="submit">تغيير</button>
      </form>
      <form className="flex items-center sm:justify-center gap-2 sm:gap-6 p-4 rounded-md">
        <input
          className="sm:w-auto w-[55%] text-md sm:text-xl border-none outline-none rounded-md py-2 px-3 bg-[#58587b] text-[#ececec]"
          type="password"
          placeholder="كلـــمة السر"
          // value={userDataUpdate.password}
          // onChange={(e) =>
          //   setUserDataUpdate({ ...userDataUpdate, password: e.target.value })
          // }
        />
        <button type="submit" className="textmd sm:text-lg">
          تغيير
        </button>
      </form>
      <form
        className="flex flex-col items-start justify-start gap-2 p-4 rounded-md border border-black sm:16rem"
        onSubmit={uploadAvatar}
      >
        <input
          placeholder="ارفع صورتك هنا"
          type="file"
          name="avatar"
          className="sm:w-auto w-[30%] text-md sm:text-xl border-none outline-none rounded-md py-2 px-3 bg-[#58587b] text-[#ececec]"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
        <button type="submit">رفع</button>
      </form>
    </div>
  );
}

export default UpdateForm;
