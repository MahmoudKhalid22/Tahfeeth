import React, { useEffect, useState } from "react";
import styles from "./UpdateForm.module.css";

function UpdateForm({ userId, userToken }) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [avatar, setAvatar] = useState(null);

  return (
    <div
      className={`${styles.container} mb-6 rounded-md border-2 border-[#43766C]`}
    >
      <form className="">
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
    </div>
  );
}

export default UpdateForm;
