import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiEntryDoor } from "react-icons/gi";
import { RxUpdate } from "react-icons/rx";
import styles from "./Details.module.css";
import AddUserForm from "./AddUserForm";
import { redirect } from "react-router-dom";

import UpdateForm from "./UpdateForm";
import Student from "../pages/Student";

function Details() {
  const [userShow, setUserShow] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [formUpdate, setFormUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  const data = localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : undefined;
  // console.log(data);

  const adminToken = data?.user.isAdmin ? data.token : undefined;
  // console.log(data.token);
  const logout = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://tahfeeth-system.onrender.com/users/logout",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + data.token,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      setLoading(false);

      localStorage.clear();
      return redirect("/");
    } catch (err) {
      setLoading(err.message);
    }
  };

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://tahfeeth-system.onrender.com/users",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + adminToken,
          },
        }
      );
      const d = await response.json();
      setUsersData(d);
      setLoading(false);
    } catch (err) {
      throw new Error(err);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);

      await fetch("https://tahfeeth-system.onrender.com/users/" + id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + adminToken,
        },
      });
      setLoading(false);

      window.location.reload();
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.name}>
        <h3>الاسم</h3>

        <h4>
          {data ? data.user.name : ""}
          {data?.user.isAdmin ? <div>(admin)</div> : undefined}
        </h4>
      </div>
      <div className={styles.settings}>
        <button className={styles.logout} onClick={logout}>
          <GiEntryDoor />
        </button>
        <button
          className={styles.logout}
          onClick={() => setFormUpdate((prev) => !prev)}
        >
          <RxUpdate />
        </button>
      </div>

      <div
        className={`${styles.updateForm} ${formUpdate ? styles.active : ""}`}
      >
        <UpdateForm userId={data?.user._id} userToken={data?.token} />
      </div>
      {!data?.user.isAdmin && <Student />}
      <div>
        {data?.user.isAdmin ? (
          <div className={styles.btns}>
            <button
              onClick={() => {
                setUserShow(true);
              }}
            >
              إضافة طالب
            </button>
            <button
              onClick={() => {
                getUsers();

                setUserShow(false);
              }}
            >
              قراءة بيانات الطلاب
            </button>
          </div>
        ) : undefined}

        <div
          className={`${styles.updateForm} ${userShow ? styles.addForm : ""}`}
        >
          <AddUserForm />
        </div>
        {loading && <h4 className="loading loading-details">تحميل ...</h4>}
        {!userShow &&
          !loading &&
          usersData?.map((user) => (
            <div className={styles.cart} key={user._id}>
              <div className={styles["student-info"]}>
                <span>الاسم / </span>
                <span>{user.name}</span>
              </div>
              <div className={styles["student-info"]}>
                <span>الايميل / </span>
                <span>{user.email}</span>
              </div>

              <div className={styles["action-buttons"]}>
                <button
                  className={styles["action-button-delete"]}
                  onClick={() => deleteUser(user._id)}
                >
                  حذف الطالب
                </button>
                <button className={styles["action-button-data"]}>
                  <Link to={`/details/${user._id}`}>بيانات الطالب</Link>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Details;
