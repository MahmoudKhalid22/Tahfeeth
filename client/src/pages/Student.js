import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import styles from "./Student.module.css";
function Student() {
  const { id } = useParams();
  const [studentData, setStudentData] = useState([]);
  const [stdName, setStdName] = useState("");
  const [showformTable, setShowFormTable] = useState(false);
  const [loadingTables, setLoadingTables] = useState(true);
  const [tableUser, setTableUser] = useState({
    day: "السبت",
    quantity: "",
    level: "ضعيف",
    tasks: "",
    completed: true,
    questions: "",
    answers: 0,
    notes: "",
    rate: "",
    owner: "",
  });

  const data = localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : undefined;

  const token = data?.token;
  const adminToken = data?.user.isAdmin ? data.token : undefined;

  const stdId = id ? id : data?.user._id;

  useEffect(() => {
    try {
      const getName = async () => {
        const response = await fetch(
          "https://tahfeeth-system.onrender.com/users/" + id
        );

        const student = await response.json();
        setStdName(student.name);
      };

      const getTables = async () => {
        const response = await fetch(
          "https://tahfeeth-system.onrender.com/tables/" + stdId,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        const tables = await response.json();

        setStudentData(tables);
        setLoadingTables(false);
      };
      if (data?.user.isAdmin) {
        getName();
      }
      getTables();
    } catch (err) {
      throw new Error(err);
    }
  }, [token, data, id, stdId]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("https://tahfeeth-system.onrender.com/tables", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + adminToken,
        },
        body: JSON.stringify({
          day: tableUser.day,
          quantity: tableUser.quantity,
          level: tableUser.level,
          tasks: tableUser.tasks,
          completed: tableUser.completed,
          questions: tableUser.questions,
          answers: tableUser.answers,
          notes: tableUser.notes,
          rate: tableUser.rate,
          ownerId: id,
        }),
      });
      setTableUser({
        day: "السبت",
        quantity: "",
        level: "ضعيف",
        tasks: "",
        completed: false,
        questions: "",
        answers: 0,
        notes: "",
        rate: "",
        owner: "",
      });

      // const d = await response.json();
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <>
      <h2>جدول المتابعة </h2>

      <div className={styles.container}>
        {data?.user.isAdmin && (
          <button>
            <Link to="/details">العودة للصفحة الرئيسية</Link>
          </button>
        )}

        {data?.user.isAdmin && <h2>{stdName}</h2>}
        {loadingTables ? (
          <h4 className="loading loading-details">تحميل ...</h4>
        ) : (
          <div className={styles.tableContainer}>
            <table>
              <thead>
                <tr>
                  <th>اليوم</th>
                  <th>كمية الحفظ</th>
                  <th>مستوى الحفظ</th>
                  <th>المهام اليومية</th>
                  <th>المهام المكتملة</th>
                  <th>الأسئلة اليومية</th>
                  <th>الإجابات على الأسئلة</th>
                  <th>ملاحظات</th>
                  <th>التقييم</th>
                </tr>
              </thead>
              <tbody>
                {studentData?.map((std) => (
                  <tr key={std._id}>
                    <td>{std.day}</td>
                    <td className={styles.notes}>{std.quantity}</td>
                    <td>{std.level}</td>
                    <td className={styles.notes}>{std.tasks}</td>
                    <td>{std.completed ? "مكتملة" : "غير مكتملة"}</td>
                    <td>{std.questions}</td>
                    <td>{std.answers}</td>
                    <td className={styles.notes}>{std.notes}</td>
                    <td>{std.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {data?.user.isAdmin && (
          <button onClick={() => setShowFormTable((prev) => !prev)}>
            إضافة جدول
          </button>
        )}
        <form
          className={`${styles.addTable} ${
            showformTable ? styles.active : undefined
          }`}
          onSubmit={handleSubmit}
        >
          <select
            name="day"
            id="day"
            onChange={(e) =>
              setTableUser({
                ...tableUser,
                day: e.target.value,
              })
            }
          >
            <option>السبت</option>
            <option>الأحد</option>
            <option>الاثنين</option>
            <option>الثلاثاء</option>
            <option>الأربعاء</option>
            <option>الخميس</option>
            <option>الجمعة</option>
          </select>

          <input
            type="text"
            placeholder="كمية الحفظ"
            value={tableUser.quantity}
            onChange={(e) =>
              setTableUser({
                ...tableUser,
                quantity: e.target.value,
              })
            }
          />
          <select
            type="text"
            placeholder="المستوى"
            onChange={(e) => {
              setTableUser({
                ...tableUser,
                level: e.target.value,
              });
            }}
          >
            <option>ضعيف</option>
            <option>مقبول</option>
            <option>جيد</option>
            <option>جيد جدا</option>
            <option>ممتاز</option>
          </select>
          <input
            placeholder="المـــهام"
            value={tableUser.tasks}
            onChange={(e) =>
              setTableUser({
                ...tableUser,
                tasks: e.target.value,
              })
            }
          />
          <select
            placeholder="المهام المكتملة"
            onChange={(e) =>
              setTableUser({
                ...tableUser,
                completed: e.target.value,
              })
            }
          >
            <option value={true}>true</option>
            <option value={false}>false</option>
          </select>
          <textarea
            placeholder="الأسئلة"
            value={tableUser.questions}
            onChange={(e) =>
              setTableUser({
                ...tableUser,
                questions: e.target.value,
              })
            }
          />
          <select
            placeholder="عدد الإجابات"
            onChange={(e) =>
              setTableUser({
                ...tableUser,
                answers: e.target.value,
              })
            }
          >
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <textarea
            placeholder="ملاحظات"
            value={tableUser.notes}
            onChange={(e) =>
              setTableUser({
                ...tableUser,
                notes: e.target.value,
              })
            }
          />
          <input
            placeholder="التقييم العام للحصة"
            value={tableUser.rate}
            onChange={(e) =>
              setTableUser({
                ...tableUser,
                rate: e.target.value,
              })
            }
          />
          <button className={styles.btn} type="submit">
            حفظ
          </button>
        </form>
        {/* )} */}
      </div>
    </>
  );
}

export default Student;
