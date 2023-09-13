import React from "react";
import styles from "./Student.module.css";
function Student() {
  return (
    <div>
        <h2>جدول متابعة الطالب</h2>
      <table>
        <tr>
          <td>كمية الحفظ</td>
          <td>مستوى الحفظ</td>
          <td>المهام اليومية</td>
          <td>المهام المكتملة</td>
          <td>الأسئلة اليومية</td>
          <td>الإجابات على الأسئلة</td>
          <td>ملاحظات</td>
          <td>التقييم</td>
        </tr>
      </table>
    </div>
  );
}

export default Student;
