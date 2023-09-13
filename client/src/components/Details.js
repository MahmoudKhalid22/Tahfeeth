import React, { useState } from "react";
import { GiEntryDoor } from "react-icons/gi";
import { RxUpdate } from "react-icons/rx";
import styles from "./Details.module.css";
import AddUserForm from "./AddUserForm";
import { useNavigate } from "react-router-dom";
import UpdateForm from "./UpdateForm";

function Details() {
  const [userShow, setUserShow] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [tables, setTables] = useState([]);
  const [formUpdate, setFormUpdate] = useState(false);

  const navigate = useNavigate();

  const data = localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : undefined;
  // console.log(data);

  const adminToken = data?.user.isAdmin ? data.token : undefined;
  // console.log(data.token);
  const logout = async () => {
    try {
      const response = await fetch("http://localhost:5000/users/logout", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + data.token,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      localStorage.clear();
      navigate("/");
    } catch (err) {
      throw new Error(err);
    }
    // localStorage.clear();
    // navigate("/");
  };

  // const addUser = async () => {
  //   await fetch("http://localhost:5000/users",{
  //     method: "POST",
  //     headers:{

  //     },
  //     body{
  //       "name":
  //     }
  //   })
  // }

  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + adminToken,
        },
      });
      setUsersData(await response.json());
    } catch (err) {
      throw new Error(err);
    }
  };

  const getTables = async () => {
    const response = await fetch("http://localhost:5000/tables", {
      method: "GET",
      header: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGZlZmQ0ZjQxNzA0ZTFiZGMyYmI2N2EiLCJpYXQiOjE2OTQ1OTc3NjJ9.5SJAyhAZaq6jrT3I9S83vXDZDF9Vzzn8dpDxZxGLJsI",
      },
    });
    const tablesData = await response.json();
    setTables(tablesData);
    console.log(tables);
  };

  const deleteUser = async (id) => {
    try {
      await fetch("http://localhost:5000/users/" + id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + adminToken,
        },
      });

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

      <div>
        {data?.user.isAdmin ? (
          <div className={styles.btns}>
            <button
              onClick={() => {
                setUserShow((prev) => !prev);
              }}
            >
              إضافة طالب
            </button>
            <button
              onClick={() => {
                getUsers();
                getTables();
              }}
            >
              قراءة بيانات الطلاب
            </button>
          </div>
        ) : undefined}

        {userShow && <AddUserForm />}

        {usersData?.map((user) => (
          <div className={styles.cart} key={user._id}>
            <div className={styles["student-info"]}>
              <span>الاسم / </span>
              <span>{user.name}</span>
            </div>
            <div className={styles["student-info"]}>
              <span>الايميل / </span>
              <span>{user.email}</span>
            </div>
            <div className={styles["student-info"]}>
              <span>Tables:</span>
              <ul>
                <li className={styles["student-task"]}>
                  Task 1: Complete Homework
                </li>
                <li className={styles["student-task"]}>
                  Task 2: Study for Exam
                </li>
                <li className={styles["student-task"]}>
                  Task 3: Submit Project
                </li>
              </ul>
            </div>
            <div className={styles["action-buttons"]}>
              <button
                className={styles["action-button-delete"]}
                onClick={() => deleteUser(user._id)}
              >
                حذف الطالب
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Details;
