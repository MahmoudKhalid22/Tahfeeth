import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import styles from "./Student.module.css";
import { RiChatDeleteLine } from "react-icons/ri";
import Spinner from "../../ui/utils/Spinner";
import { formatDate } from "../../utils/dateFormat";
import { useUser } from "../../features/user/useUser";
import Cookies from "js-cookie";
import { useGetTable } from "./useTable";
import { AuthContext } from "../../utils/context";
import BadRequest from "../../ui/utils/BadRequest";

function Student() {
  const { id } = useParams();
  const [showformTable, setShowFormTable] = useState(false);
  const { isLogin } = useContext(AuthContext);

  // const [loadingTables, setLoadingTables] = useState(true);
  const [loadingDelMap, setLoadingDelMap] = useState({});
  // const [error, setError] = useState("");

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

  // const data = localStorage.getItem("data")
  //   ? JSON.parse(localStorage.getItem("data"))
  //   : null;

  const token = Cookies.get("accessToken");
  let { isPending, data: userData, error } = useUser(token);

  userData = userData ? userData[0] : null;

  const isStudent = userData?.role === "student";
  let studentId;
  if (isStudent) {
    studentId = userData?._id;
  } else {
    studentId = id;
  }

  const {
    isPending: isPendingTable,
    data: tablesData,
    error: errorData,
  } = useGetTable(token, studentId);

  if (!isLogin) {
    return <BadRequest />;
  }

  return (
    <div className="w-full mb-[11.5rem] md:mb-0 md:w-[75%] absolute left-0">
      <h2 className="text-xl font-semibold text-[#43766C] text-center mt-12">
        جدول المتابعة
      </h2>

      <div className={styles.container}>
        {userData?.role === "teacher" && (
          <button>
            <Link to="/details">العودة للصفحة الرئيسية</Link>
          </button>
        )}
        {isPendingTable ? (
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
              {tablesData?.length > 0 && (
                <tbody>
                  {tablesData?.map((std) => (
                    <tr key={std._id}>
                      <td>
                        <p>{std.day}</p>
                        <p className="whitespace-nowrap">
                          {formatDate(std.createdAt)}
                        </p>
                      </td>
                      <td className={styles.notes}>{std.quantity}</td>
                      <td>{std.level}</td>
                      <td className={styles.notes}>{std.tasks}</td>
                      <td>{std.completed ? "مكتملة" : "غير مكتملة"}</td>
                      <td className="whitespace-pre">{std.questions}</td>
                      <td>{std.answers}</td>
                      <td className={styles.notes}>{std.notes}</td>
                      <td>{std.rate}</td>
                      {loadingDelMap[std._id] ? (
                        <Spinner />
                      ) : (
                        <td
                          className={styles.delete}
                          // onClick={() => deleteTable(std._id)}
                        >
                          <RiChatDeleteLine />
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        )}
        {userData?.role === "teacher" && (
          <button onClick={() => setShowFormTable((prev) => !prev)}>
            إضافة جدول
          </button>
        )}
        {showformTable && (
          <form
            className={`${styles.addTable}`}
            // onSubmit={handleSubmit}
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
        )}
      </div>
    </div>
  );
}

export default Student;
