import React from "react";
import Input from "../components/Input";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className="font-bold text-center">     
      <div className={styles.container}>
        <Input />
      </div>
    </div>
  );
}

export default Home;
