import React from "react";
import Input from "../components/Input";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.wrapper}>
      <h1>خيركم من تعلم القرآن وعلمه</h1>
      

      <div className={styles.container}>
        <Input />
      </div>
    </div>
  );
}

export default Home;
